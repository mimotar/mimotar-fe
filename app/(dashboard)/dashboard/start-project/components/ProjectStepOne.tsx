import { AlertCircle, ArrowRight, FileText } from "lucide-react";
import { InteractiveMultiUploader } from "./InteractiveMultiUploader";
import { useEffect, useState } from "react";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPersistedAttachment, ITicket } from "../types/ITicket";
import { StepOneForm, stepOneSchema } from "../schema/projectSchema";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";

export const fileToPersistedAttachment = (
  file: File,
): Promise<IPersistedAttachment> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        base64Url: reader.result as string,
      });
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};
const mapDefaultValues = (ticket: ITicket): StepOneForm => ({
  currency: ticket.currency || "NGN",
  title: ticket.title || "",
  attachment: ticket.attachment || [],
  pay_escrow_fee: ticket.pay_escrow_fee || "BOTH",
  transaction_description: ticket.transaction_description || "",
  amount: Number(formatNumberToCurrency(ticket.amount)) || 0,
  close_deadline: ticket.close_deadline
    ? new Date(ticket.close_deadline)
    : new Date(),
});

export default function ProjectStepOne() {
  const [amount, setAmount] = useState<number>(0);
  const [hasMilestones, setHasMilestones] = useState(false);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [uploadFileJson, setUploadFileJson] = useState<IPersistedAttachment[]>(
    [],
  );

  const ticket = useAppSelector((state) => state.createTransaction);
  console.log("step 1", ticket);
  const { nextStep } = useNavigateProjectStep();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<StepOneForm>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: mapDefaultValues(ticket),
  });

  useEffect(() => {
    reset(mapDefaultValues(ticket));
  }, [ticket, reset]);

  console.log(errors);

  const persistAttachment = getValues("attachment").filter(
    (item): item is IPersistedAttachment => !(item instanceof File),
  );

  console.log(persistAttachment);

  const onSubmitStepOne = (data: StepOneForm) => {
    dispatch(
      setTransactionDetails({
        amount: data.amount,
        title: data.title,
        currency: data.currency,
        pay_escrow_fee: data.pay_escrow_fee,
        transaction_description: data.transaction_description,
        close_deadline: String(data.close_deadline),
        attachment: uploadFileJson,
      }),
    );
    nextStep(2);
  };
  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div>
        <h2 className="text-h3 text-gray-900">
          Describe the core project terms
        </h2>
        <p className="text-body-sm text-gray-400 mt-1">
          Establish the budget, deadline, and basic parameters.
        </p>
      </div>

      <form
        id="project-step-1"
        onSubmit={handleSubmit(onSubmitStepOne)}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="create-project-title"
            className="text-label text-gray-400 mb-1 block"
          >
            Contract Title
          </label>
          <input
            id="create-project-title"
            type="text"
            {...register("title")}
            placeholder="e.g. Redesign of Corporate Logo & Asset Book"
            className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium 
         ${errors?.title ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}
                `}
          />
          {errors?.title && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.title?.message}</span>
            </div>
          )}
          {/* <AnimatePresence>
                {renderTooltip(
                  0,
                  showTour,
                  activeTourIndex,
                  setShowTour,
                  setActiveTourIndex,
                )}
              </AnimatePresence> */}
        </div>

        <div>
          <label
            htmlFor="create-project-description"
            className="text-label text-gray-400 mb-1 block"
          >
            Comprehensive Deliverables Scope
          </label>
          <textarea
            id="create-project-description"
            rows={4}
            {...register("transaction_description")}
            placeholder="List precisely what must be delivered (e.g., PSD files, font formats, social layouts). Transparent inputs prevent disputes later."
            className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium leading-relaxed    ${errors.transaction_description ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
          />
          {errors?.transaction_description && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.transaction_description?.message}</span>
            </div>
          )}
          {/* <AnimatePresence>
                {renderTooltip(
                  1,
                  showTour,
                  activeTourIndex,
                  setShowTour,
                  setActiveTourIndex,
                )}
              </AnimatePresence> */}
        </div>

        {/* Document attachments instructions */}
        <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-100/50 text-amber-950 text-xs flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <FileText className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Project Clarification:</span> Upload
              all related files or documents that will clarify the project to
              avoid issues later.
            </div>
          </div>
          <InteractiveMultiUploader
            id="creation-attachments-uploader"
            files={persistAttachment}
            onChange={(persistAttachmentObj) => {
              setValue("attachment", persistAttachmentObj);
              setUploadFileJson(persistAttachmentObj);
              // setAttachedFiles;
            }}
            placeholder="Drag & drop contract files, templates, or images here to attach"
          />

          {errors?.attachment && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in font-sans">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.attachment?.message}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-label text-gray-400 mb-1 block">
              Escrow Currency Mode
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setValue("currency", "NGN");
                  setCurrency("NGN");
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${currency === "NGN" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
              >
                Naira (₦)
              </button>
              <button
                type="button"
                onClick={() => {
                  setValue("currency", "USD");
                  setCurrency("USD");
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${currency === "USD" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
              >
                US Dollar ($)
              </button>
            </div>
            {errors?.currency && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in font-sans">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors?.currency?.message}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-label text-gray-400 mb-1 block">
              Total Project Value ({currency === "NGN" ? "₦" : "$"})
            </label>
            {hasMilestones ? (
              <div className="relative">
                <input
                  type="text"
                  {...register("amount")}
                  //   value={formatCurrency(amount)}
                  // value={formatNumberToCurrency(
                  //   amount,
                  //   { style: "currency", currency: "NGN" },
                  //   "en-NGN",
                  // )}
                  readOnly
                  disabled
                  className="w-full px-4 py-3 text-xs bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-mono font-bold cursor-not-allowed select-none"
                />
                <div className="text-[10px] text-brand-primary font-semibold mt-1.5 flex items-center gap-1 pl-1">
                  <span>
                    🔗 Calculated automatically from milstones in Step 2.
                  </span>
                </div>

                {errors?.amount && (
                  <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in font-sans">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.amount?.message}</span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <input
                  type="number"
                  {...register("amount")}
                  placeholder="e.g. 500000"
                  className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-mono font-bold  ${errors?.amount ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
                />
                {errors?.amount && (
                  <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in font-sans">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors?.amount?.message}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-label text-gray-400 mb-1 block">
              Final Close Deadline
            </label>
            <input
              type="date"
              {...register("close_deadline", {
                setValueAs(value) {
                  new Date(value).toISOString().split("T")[0];
                },
              })}
              className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border text-gray-800 focus:outline-none transition-colors font-semibold ${errors?.close_deadline ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors?.close_deadline && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.close_deadline?.message}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-label text-gray-400 mb-1 block">
              Who pays Mimotar Flat Fee (3%)?
            </label>
            <select
              {...register("pay_escrow_fee")}
              className="w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border border-gray-100 text-gray-800 focus:outline-none focus:border-brand-primary font-semibold"
            >
              <option value="BOTH">
                Split Equally (1.5% Client / 1.5% Freelancer)
              </option>
              <option value="CLIENT">Client pays entire 3% fee</option>
              <option value="FREELANCER">Freelancer pays entire 3% fee</option>
            </select>

            {errors?.pay_escrow_fee && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.pay_escrow_fee?.message}</span>
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          form="project-step-1"
          //   onClick={() => {
          //     // if (validateStep1()) {
          //     // navigateProjectStep(2);
          //     // setStep(2);
          //     // }
          //   }}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
