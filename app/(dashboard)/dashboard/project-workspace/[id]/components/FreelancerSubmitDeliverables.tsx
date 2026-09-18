import { Dispatch, SetStateAction } from "react";
import { IFreelancerWorkSubmissionPayload } from "../api/freelancerWorkSubmission";
import { Loader2, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  deliverySchema,
  IDeliverySchema,
} from "../schema/freelancerSubmitDeliverableSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploader } from "@/app/(dashboard)/utils/FileUploader";

interface IFreelancerSubmitDeliverables {
  onSubmit: (data: IDeliverySchema) => void;
  setShowSubmitModal: Dispatch<SetStateAction<boolean>>;
  isUploading: boolean;
}

export default function FreelancerSubmitDeliverables({
  onSubmit,
  setShowSubmitModal,
  isUploading,
}: IFreelancerSubmitDeliverables) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDeliverySchema>({
    defaultValues: {
      file: [],
      note: "",
    },
    resolver: zodResolver(deliverySchema),
    mode: "onTouched",
  });

  const handleOnsubmit = async (data: IDeliverySchema) => {
    onSubmit(data);
  };

  return (
    <section className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit(handleOnsubmit)}
        className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in text-left space-y-4"
      >
        <button
          type="button"
          onClick={() => setShowSubmitModal(false)}
          className="absolute top-4 right-4 p-2.5 hover:bg-gray-100/85 rounded-xl transition cursor-pointer"
          aria-label="Close font-sans"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div>
          <h3 className="text-base font-bold text-[#111827]">
            Submit Project Deliverables
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Briefly define your deliverables and include direct
            file/documentation pointers.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1">
            Delivered proof notes
          </label>
          <textarea
            rows={3}
            {...register("note")}
            placeholder="List Figma links, repository credentials, or ZIP folder details. Clear descriptions support faster release timers."
            className=" resize-none w-full text-xs bg-gray-50 px-3 py-2 border border-gray-400 rounded-xl focus:outline-none focus:border-brand-primary font-medium"
          />
        </div>

        <Controller
          name="file"
          control={control}
          render={({ field, fieldState }) => (
            <FileUploader
              value={field.value}
              onChange={field.onChange}
              multiple={false}
              maxFiles={1}
              error={fieldState.error?.message}
              label="Attach Final Deliverable"
              description="PNG, JPG, PDF, ZIP, DOC or DOCX. Maximum 20 MB."
              disabled={isUploading}
            />
          )}
        />

        {/* {errors.file && (
          <p className="mt-1 text-xs text-red-600 font-semibold">
            {errors.file.message}
          </p>
        )} */}
        {/* {uploadError && (
          <p className="text-xs text-red-600 font-semibold">{uploadError}</p>
        )} */}

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" /> Submitting
              deliverables
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
  );
}
