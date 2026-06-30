import React, { useMemo, useState } from "react";
import { InteractiveMultiUploader } from "./InteractiveMultiUploader";
import { Milestone } from "../types/milestones";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { useNavigateProjectStep } from "../hooks/usenavigateProjectStep";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMilestones, MilestonesSchema } from "../schema/projectSchema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IMilestone, IPersistedAttachment } from "../types/ITicket";
import { setTransactionDetails } from "@/lib/slices/createTransactionslice";

export default function ProjectStepTwo() {
  const [hasMilestones, setHasMilestones] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [msTitle, setMsTitle] = useState("");
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [msAmount, setMsAmount] = useState<number>(0);
  const [msDeadline, setMsDeadline] = useState("");
  const [msFile, setMsFile] = useState("");
  const [msFiles, setMsFiles] = useState<IPersistedAttachment[]>([]);
  const [milestoneError, setMilestoneError] = useState<string | null>(null);
  const [milestoneAddedSuccess, setMilestoneAddedSuccess] =
    useState<IMilestone | null>(null);
  const [amountError, setAmountError] = useState("");

  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.createTransaction);
  console.log(ticket);
  const { nextStep } = useNavigateProjectStep();

  const persistedMilestones = useMemo(() => {
    return ticket.milestones?.map((obj) => obj);
  }, [ticket]);

  //   const persistedMilestonesAttachment = useMemo(() => {
  //   return ticket.milestones?.map((obj) => obj.files);
  // }, [ticket]);

  const persistedMilestonesAttachment = persistedMilestones?.flatMap(
    (m) => m.files ?? [],
  );
  console.log(persistedMilestones);

  const handleAddMilestone = () => {
    setMilestoneError(null);
    if (!msTitle || msAmount <= 0 || !msDeadline) {
      setMilestoneError("Milestone Title, Amount, and Deadline are required.");
      return;
    }

    const combinedFileList = [...msFiles];
    // if (msFile.trim()) {
    //   combinedFileList.push(msFile.trim());
    // }

    const newMs: IMilestone = {
      id: `ms-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      name: msTitle,
      amount: msAmount,
      deadline: msDeadline,
      // isCompleted: false,
      // isApproved: false,
      // deliveryFile: combinedFileList.join(", ") || undefined,
      // deliveryFiles: combinedFileList,
      files: combinedFileList,
    };

    const nextMilestones = persistedMilestones
      ? [...persistedMilestones, newMs]
      : undefined;
    // setMilestones(nextMilestones);
    dispatch(
      setTransactionDetails({
        milestones: nextMilestones,
      }),
    );

    // Automatically calculate total project value from milestones sum
    const newSum = nextMilestones?.reduce((sum, m) => sum + m.amount, 0);
    setAmount(newSum ?? 0);
    if (amountError) setAmountError("");

    // Trigger milestone validation success modal indication
    setMilestoneAddedSuccess(newMs);

    // Reset inputs
    setMsTitle("");
    setMsAmount(0);
    setMsDeadline("");
    setMsFile("");
    setMsFiles([]);
  };

  const handleRemoveMilestone = (id: string) => {
    const nextMilestones = persistedMilestones.filter((m) => m.id !== id);
    // setMilestones(nextMilestones);
    dispatch(
      setTransactionDetails({
        milestones: nextMilestones,
      }),
    );

    // Automatically calculate total project value from milestones sum
    const newSum = nextMilestones.reduce((sum, m) => sum + m.amount, 0);
    setAmount(newSum);
  };

  const formatCurrency = (val: number) => {
    return currency === "NGN"
      ? `₦${val.toLocaleString()}`
      : `$${val.toLocaleString()}`;
  };

  const handleProceedToSummary = () => {
    if (hasMilestones) {
      if (persistedMilestones.length === 0) {
        setMilestoneError(
          "At least one milestone phase must be added when milestones are active.",
        );
        return;
      }
      // const sum = milestones.reduce((s, m) => s + m.amount, 0);
      // setAmount(sum);
    }
    // setStep(4);
    // nextStep(4);
  };

  const handleNextStage = (data: IMilestones) => {};

  const { handleSubmit, register, control, reset, trigger, setError } = useForm(
    {
      resolver: zodResolver(MilestonesSchema),
      defaultValues: {
        milestones: [
          {
            name: "",
            deadline: "",
            amount: 0,
            attachment: undefined,
          },
        ],
      },
    },
  );

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="space-y-2">
        <div className="flex flex-row items-center justify-between gap-3 w-full">
          <h2
            id="milestone-step-heading"
            className="text-base sm:text-lg font-extrabold text-[#111827] shrink"
          >
            Break into milestones
          </h2>

          {/* Simple toggle slider */}
          <div
            onClick={() => {
              const nextVal = !hasMilestones;
              setHasMilestones(nextVal);
              if (nextVal) {
                const sum = milestones.reduce((s, m) => s + m.amount, 0);
                setAmount(sum);
              }
            }}
            className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 hover:bg-gray-100/50 border border-gray-100 p-1.5 px-2 sm:p-2 rounded-xl transition cursor-pointer select-none shrink-0"
          >
            <span className="text-[10px] sm:text-xs font-bold text-gray-500">
              {hasMilestones ? "Milestones Active" : "Milestones inactive"}
            </span>
            <button
              type="button"
              className={`w-9 sm:w-11 h-5 sm:h-6 rounded-full p-0.5 transition-colors ${hasMilestones ? "bg-brand-primary" : "bg-gray-200"} pointer-events-none focus:outline-none`}
              aria-label="Toggle Milestones"
            >
              <div
                className={`bg-white w-4 sm:w-5 h-4 sm:h-5 rounded-full shadow-xs transition-transform ${hasMilestones ? "translate-x-4 sm:translate-x-5" : ""}`}
              />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Recommended for high value projects (₦400,000+). Release pay
          bit-by-bit on deliverables.
        </p>
      </div>

      {/* <AnimatePresence>
                {renderTooltip(
                  2,
                  showTour,
                  activeTourIndex,
                  setShowTour,
                  setActiveTourIndex,
                )}
              </AnimatePresence> */}

      {hasMilestones ? (
        <div onSubmit={handleSubmit(handleNextStage)} className="space-y-6">
          {/* Milestone Builder Forms */}
          <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-800 block">
              Add Milestone Phase
            </span>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                Milestone Name / Phase deliverables
              </label>
              <input
                type="text"
                value={msTitle}
                onChange={(e) => setMsTitle(e.target.value)}
                placeholder="e.g., Phase 1: High fidelity Figma system wireframes"
                className="w-full bg-white px-3 py-2 rounded-xl border border-gray-100 text-xs focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Phase Amount ({currency === "NGN" ? "₦" : "$"})
                </label>
                <input
                  type="number"
                  value={msAmount || ""}
                  onChange={(e) => setMsAmount(Number(e.target.value))}
                  placeholder="e.g. 150000"
                  className="w-full bg-white px-3 py-2 rounded-xl border border-gray-100 text-xs focus:outline-none focus:border-brand-primary font-mono font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Phase Deadline
                </label>
                <input
                  type="date"
                  value={msDeadline}
                  onChange={(e) => setMsDeadline(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-gray-100 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Optional doc clarity guidance explicitly inside Milestones panel */}
            <div className="p-3 bg-amber-50/50 rounded-xl leading-normal text-[10px] text-amber-900 border border-amber-150 flex flex-col gap-2.5">
              <span className="font-bold flex items-center gap-1.5 text-xs text-amber-950">
                📷 Phase Deliverables and Guides
              </span>
              <InteractiveMultiUploader
                id="milestone-guide-uploader"
                files={persistedMilestonesAttachment}
                onChange={(fileJSON) => {
                  setMsFiles(fileJSON);
                }}
                placeholder="Drag & drop guide files, reference documents, or specs here"
              />
            </div>

            {milestoneError && (
              <p className="text-[11px] text-red-600 font-semibold">
                {milestoneError}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddMilestone}
                className="bg-brand-primary hover:bg-brand-primary/95 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Phase
              </button>
            </div>
          </div>

          {/* Milestone Summary check */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Phases Added ({milestones.length})</span>
              <span>
                Combined Value:{" "}
                {formatCurrency(milestones.reduce((s, m) => s + m.amount, 0))} /{" "}
                {formatCurrency(amount)}
              </span>
            </div>

            {persistedMilestones?.length === 0 ? (
              <p className="text-center text-xs py-8 text-gray-400 bg-gray-50/40 rounded-2xl border border-dashed border-gray-100">
                No active milestones defined. Click add above to secure
                piecemeal payouts.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {persistedMilestones?.map((m, i) => (
                  <div
                    key={m.id}
                    className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between gap-4 animate-fade-in font-sans"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase">
                        Milestone {i + 1}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900">
                        {m.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 block font-semibold">
                        Tethered close date: {m.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-800 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        {formatCurrency(m.amount)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestone(m.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-purple-100/[0.03] border border-brand-primary/10 p-6 rounded-2xl flex flex-col gap-3 font-sans">
          <span className="text-xs font-bold text-brand-primary">
            Single Escrow Phase Release active
          </span>
          <p className="text-xs text-gray-500 leading-relaxed leading-relaxed">
            You chose not to partition the payment. The total project value of{" "}
            <span className="font-bold text-gray-800 font-mono">
              {formatCurrency(amount)}
            </span>{" "}
            will be locked in bulk and released entirely at once upon completion
            delivery and approval. This is super efficient for short-term or
            sprint tasks.
          </p>
        </div>
      )}

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => {
            nextStep(1);
            // setStep(1)
          }}
          className="px-5 py-3 cursor-pointer border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50 transition"
        >
          Back
        </button>

        <button
          onClick={handleProceedToSummary}
          className="bg-brand-primary text-white text-xs font-bold rounded-xl px-6 py-3.5 transition flex items-center gap-2 cursor-pointer"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
