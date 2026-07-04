import { AlertCircle, ArrowRight } from "lucide-react";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepThreeSchema } from "../schema/projectSchema";
import { IStepThreeForm } from "../types/IStepThree";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";
import { ITicket } from "../types/ITicket";

export const mapStepThreeDefaultValues = (ticket: ITicket): IStepThreeForm => ({
  counterpartyRole: ticket.reciever_role ?? "CLIENT",
  counterpartyName: ticket.receiver_fullname ?? "",
  counterpartyEmail: ticket.reciever_email ?? "",
  counterpartyPhone: ticket.receiver_no ?? "",
});

export default function ProjectStepThree() {
  const { nextStep } = useNavigateProjectStep();
  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.createTransaction);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IStepThreeForm>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: mapStepThreeDefaultValues(ticket),
    mode: "onBlur",
  });

  const Role = watch("counterpartyRole");

  const handleNext = (data: IStepThreeForm) => {
    dispatch(
      setTransactionDetails({
        receiver_fullname: data.counterpartyName,
        reciever_email: data.counterpartyEmail,
        receiver_no: data.counterpartyPhone || "",
        reciever_role: data.counterpartyRole.toUpperCase() as
          | "CLIENT"
          | "FREELANCER",
      }),
    );
    nextStep(4);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-extrabold text-[#111827]">
          Secure your counterparty details
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Both sides sign the escrow parameters securely inside Lagos portal.
        </p>
      </div>

      <form
        id="project-step-3"
        onSubmit={handleSubmit(handleNext)}
        className="space-y-4 text-left"
      >
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            Their Role in this Project
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                // setOtherRole("client");
                setValue("counterpartyRole", "CLIENT");
              }}
              className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${Role === "CLIENT" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("counterpartyRole", "FREELANCER");
              }}
              className={`flex-1 py-3 text-xs font-bold rounded-xl border transition cursor-pointer ${Role === "FREELANCER" ? "bg-purple-50 text-brand-primary border-brand-primary/50" : "bg-white text-gray-500 border-gray-100"}`}
            >
              Freelancer
            </button>
          </div>

          {errors?.counterpartyRole && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.counterpartyRole?.message}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">
              Counterparty Legal Name
            </label>
            <input
              type="text"
              {...register("counterpartyName")}
              placeholder="e.g. Amara Ndukwe"
              className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium ${errors?.counterpartyName ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors?.counterpartyName && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.counterpartyName?.message}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">
              Counterparty Email Address
            </label>
            <input
              type="email"
              {...register("counterpartyEmail")}
              // onBlur={handleOtherEmailBlur}
              placeholder="name@email.com"
              className={`w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border placeholder-gray-300 text-gray-800 focus:outline-none transition-colors font-medium ${errors?.counterpartyEmail ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-gray-100 focus:border-brand-primary"}`}
            />
            {errors?.counterpartyEmail && (
              <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors?.counterpartyEmail?.message}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">
            WhatsApp Phone Number (Optional)
          </label>
          <input
            type="text"
            {...register("counterpartyPhone")}
            placeholder="e.g. +234 803 123 4567"
            className="w-full px-4 py-3 text-xs bg-gray-50/50 rounded-xl border border-gray-100 placeholder-gray-300 text-gray-800 focus:outline-none focus:border-brand-primary font-medium"
          />
          <span className="block text-[10px] text-gray-400 mt-1 leading-normal font-sans">
            Dispute mediators leverage WhatsApp coordinates to reach resolutions
            directly when incident triggers happen.
          </span>

          {errors?.counterpartyPhone && (
            <div className="text-[10px] text-red-600 font-semibold mt-1 flex items-center gap-1 pl-1 animate-fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors?.counterpartyPhone?.message}</span>
            </div>
          )}
        </div>
      </form>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => {
            nextStep(2);
            // setStep(2)
          }}
          className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition animate-fade-in"
        >
          Back
        </button>

        <button
          type="submit"
          form="project-step-3"
          // onClick={() => {
          //   if (validateStep3()) {
          //     nextStep(4);
          //     // setStep(4);
          //   }
          // }}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer shadow-xs"
        >
          View Summary
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
