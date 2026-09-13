import { Calendar, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IExtendDeadlinePayload } from "../api/extendDeadline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extendDeadlineSchema } from "../schema/extendDeadline";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface IExtendDeadline {
  setShowExtendModal: Dispatch<SetStateAction<boolean>>;
  deadline: string;
  onExtensionSubmit: (data: IExtendDeadlinePayload) => Promise<void>;
  isSubmitting: boolean;
}

export default function ExtendDeadline({
  setShowExtendModal,
  deadline,
  onExtensionSubmit,
  isSubmitting,
}: IExtendDeadline) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IExtendDeadlinePayload>({
    defaultValues: {
      deadline: "",
      reason: "",
    },
    resolver: zodResolver(extendDeadlineSchema),
  });

  const handleExtension = async (data: IExtendDeadlinePayload) => {
    await onExtensionSubmit(data);
  };

  useEffect(() => {
    reset({
      deadline: deadline.split("T")[0],
      reason: "",
    });
  }, [deadline, reset]);
  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit(handleExtension)}
        className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left space-y-4"
      >
        <button
          type="button"
          onClick={() => setShowExtendModal(false)}
          className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
          aria-label="Close font-sans"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div>
          <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-primary" /> Extend Project
            Deadlines
          </h3>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Clients can select a new date to extend deadlines. All milestone
            phases and the total contract deadline can be adjusted here.
          </p>
        </div>

        <div>
          <label
            htmlFor="extension-total-agreement-deadline"
            className="block text-xs font-bold text-slate-500 mb-1"
          >
            Total Agreement Deadline
          </label>
          <input
            id="extension-total-agreement-deadline"
            type="date"
            {...register("deadline")}
            className={`w-full text-xs bg-gray-50 px-3 py-2 border rounded-xl focus:outline-none focus:border-brand-primary font-medium ${
              errors.deadline ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.deadline && (
            <p className="text-xs text-red-500 mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="extension-reason"
            className="block text-xs font-bold text-slate-500 mb-1"
          >
            Reason
          </label>

          <textarea
            id="extension-reason"
            rows={4}
            {...register("reason")}
            className={`w-full text-xs resize-none bg-gray-50 px-3 py-2 border rounded-xl focus:outline-none focus:border-brand-primary font-medium ${
              errors.reason ? "border-red-500" : "border-gray-200"
            }`}
          />

          {errors.reason && (
            <p className="text-xs text-red-500 mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* {project.milestones && extendedMilestoneDeadlines.length > 0 && (
                <div className="space-y-3 pt-1 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Modify Milestone Phases Deadlines
                  </span>
                  <div className="space-y-3.5 max-h-52 overflow-y-auto pr-1">
                    {project.milestones.map((m, i) => {
                      const msState = extendedMilestoneDeadlines.find(
                        (u) => Number(u.id) === m.id,
                      );
                      const currentDeadlineVal = msState
                        ? msState.deadline
                        : m.deadline;
                      return (
                        <div
                          key={m.id}
                          className="bg-gray-50/70 p-3 rounded-xl border border-gray-100 flex flex-col gap-1 text-left"
                        >
                          <span className="text-[10px] font-bold text-gray-600 block">
                            Milestone {i + 1}: {m.name}
                          </span>
                          <input
                            type="date"
                            required
                            value={currentDeadlineVal}
                            onChange={(e) => {
                              const newVal = e.target.value;
                              setExtendedMilestoneDeadlines((prev) =>
                                prev.map((x) =>
                                  Number(x.id) === m.id
                                    ? { ...x, deadline: newVal }
                                    : x,
                                ),
                              );
                            }}
                            className="w-full bg-white px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary font-semibold"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )} */}

        <div className="pt-2 flex gap-3">
          <button
            type="button"
            onClick={() => setShowExtendModal(false)}
            className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-605 text-xs font-bold rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex gap-2 items-center justify-center py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
          >
            Save
            {isSubmitting && (
              <AiOutlineLoading3Quarters className=" animate-spin" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
