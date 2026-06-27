"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Paperclip,
  X,
  Upload,
} from "lucide-react";
import { IPersistedAttachment } from "../types/ITicket";
import { fileToPersistedAttachment } from "./ProjectStepOne";

interface SimulatedFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed" | "failed";
}

interface InteractiveMultiUploaderProps {
  // files: string[];
  files: IPersistedAttachment[];
  // onChange: (files: string[]) => void;
  onChange: (files: IPersistedAttachment[]) => void;
  id: string;
  label?: string;
  placeholder?: string;
  maxFiles?: number;
  theme?: "brand" | "danger";
  accept?: string;
}

export const InteractiveMultiUploader = ({
  files,
  onChange,
  id,
  label,
  placeholder = "Drag & drop files or click to browse",
  maxFiles = 10,
  theme = "brand",
  accept = "*/*",
}: InteractiveMultiUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [simUploads, setSimUploads] = useState<SimulatedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize initial state: if parent has files that are not in simUploads, pre-populate them as completed
  // useEffect(() => {
  //   setSimUploads((prev) => {
  //     const existingNames = new Set(prev.map((f) => f.name));
  //     const newSims = [...prev];
  //     let updated = false;

  //     files.forEach((fileName, index) => {
  //       if (!existingNames.has(fileName)) {
  //         // Generate realistic size
  //         const sizeKb = Math.floor(Math.random() * 800) + 120;
  //         const sizeStr =
  //           sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

  //         newSims.push({
  //           id: `init-${index}-${fileName}`,
  //           name: fileName,
  //           size: sizeStr,
  //           progress: 100,
  //           status: "completed",
  //         });
  //         updated = true;
  //       }
  //     });

  //     // Filter out files that were removed from parent
  //     const parentNames = new Set(files);
  //     const filtered = newSims.filter((s) => {
  //       if (s.status === "completed" && !parentNames.has(s.name)) {
  //         updated = true;
  //         return false;
  //       }
  //       return true;
  //     });

  //     return updated ? filtered : prev;
  //   });
  // }, [files]);

  useEffect(() => {
    setSimUploads((prev) => {
      const existingIds = new Set(prev.map((f) => f.id));

      const next = [...prev];

      files.forEach((file) => {
        if (!existingIds.has(file.id)) {
          const sizeKb = Math.round(file.size / 1024);

          next.push({
            id: file.id,
            name: file.name,
            size:
              sizeKb > 1024
                ? `${(sizeKb / 1024).toFixed(1)} MB`
                : `${sizeKb} KB`,
            progress: 100,
            status: "completed",
          });
        }
      });

      return next.filter((item) => files.some((f) => f.id === item.id));
    });
  }, [files]);

  // const handleFilesAdded = (selectedFiles: FileList | null) => {
  //   if (!selectedFiles || selectedFiles.length === 0) return;

  //   const remainingSlots = maxFiles - files.length;
  //   if (remainingSlots <= 0) {
  //     alert(`Maximum of ${maxFiles} files reached.`);
  //     return;
  //   }

  //   const filesArray = Array.from(selectedFiles).slice(0, remainingSlots);
  //   const newFileNames: string[] = [];
  //   const newSimList: SimulatedFile[] = [];

  //   filesArray.forEach((file) => {
  //     const fileId = `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  //     const sizeKb = Math.round(file.size / 1024);
  //     const sizeStr =
  //       sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

  //     newFileNames.push(file.name);
  //     newSimList.push({
  //       id: fileId,
  //       name: file.name,
  //       size: sizeStr,
  //       progress: 100,
  //       status: "completed",
  //     });
  //   });

  //   setSimUploads((prev) => [...prev, ...newSimList]);
  //   onChange([...files, ...newFileNames]);
  // };

  const handleFilesAdded = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const remainingSlots = maxFiles - files.length;

    if (remainingSlots <= 0) {
      alert(`Maximum of ${maxFiles} files reached.`);
      return;
    }

    const filesArray = Array.from(selectedFiles).slice(0, remainingSlots);

    const persistedFiles = await Promise.all(
      filesArray.map(fileToPersistedAttachment),
    );

    const newSimList: SimulatedFile[] = persistedFiles.map((file) => {
      const sizeKb = Math.round(file.size / 1024);

      return {
        id: file.id,
        name: file.name,
        size:
          sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
        progress: 100,
        status: "completed",
      };
    });

    setSimUploads((prev) => [...prev, ...newSimList]);

    onChange([...files, ...persistedFiles]);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFilesAdded(e.dataTransfer.files);
  };

  // const removeFile = (fileId: string, fileName: string) => {
  //   setSimUploads((prev) => prev.filter((f) => f.id !== fileId));
  //   onChange(files.filter((f) => f !== fileName));
  // };

  const removeFile = (id: string) => {
    setSimUploads((prev) => prev.filter((f) => f.id !== id));

    onChange(files.filter((f) => f.id !== id));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const containerBorderClass =
    theme === "danger"
      ? isDragOver
        ? "border-red-500 bg-red-50/30"
        : "border-red-200 hover:border-red-400 bg-red-50/[0.05]"
      : isDragOver
        ? "border-brand-primary bg-brand-primary/[0.04]"
        : "border-gray-200 hover:border-brand-primary/40 bg-gray-50/30 hover:bg-slate-50/50";

  const headingTextClass =
    theme === "danger" ? "text-red-700" : "text-brand-primary";

  return (
    <div className="space-y-2 text-left font-sans">
      {label && (
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          {label}
        </label>
      )}

      {/* Main Drag and Drop Node */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${containerBorderClass}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => handleFilesAdded(e.target.files)}
        />

        <div className="flex flex-col items-center gap-1.5 select-none">
          <div
            className={`p-2 rounded-lg ${theme === "danger" ? "bg-red-50 text-red-500" : "bg-brand-primary/10 text-brand-primary"} animate-pulse`}
          >
            <Upload className="w-5 h-5" />
          </div>
          <span
            className={`text-[11px] font-bold ${headingTextClass} hover:underline`}
          >
            {placeholder}
          </span>
          <span className="text-[9.5px] text-gray-400">
            Selected files are safely attached automatically from your device
          </span>
        </div>
      </div>

      {/* Upload Progress & Active File Queue */}
      {simUploads.length > 0 && (
        <div className="space-y-1.5 pt-1.5">
          {simUploads.map((file) => (
            <div
              key={file.id}
              className={`p-2.5 rounded-lg border flex flex-col gap-1.5 transition-all animate-fade-in ${
                file.status === "uploading"
                  ? "bg-slate-50/70 border-gray-150"
                  : file.status === "completed"
                    ? "bg-emerald-50/20 border-emerald-100"
                    : "bg-red-50/20 border-red-100"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    className={`p-1.5 rounded-md shrink-0 ${
                      file.status === "completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500 animate-pulse"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold text-gray-700 truncate font-mono select-all">
                      {file.name}
                    </span>
                    <span className="block text-[9px] text-gray-400 font-medium font-mono">
                      {file.size}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {file.status === "uploading" ? (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-brand-primary font-mono animate-pulse">
                      <div className="w-2.5 h-2.5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                      <span>{file.progress}%</span>
                    </div>
                  ) : file.status === "completed" ? (
                    <div className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[9.5px] font-bold text-red-600 bg-red-50/80 border border-red-100 px-1.5 py-0.5 rounded-full">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                      <span>Failed</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // removeFile(file.id, file.name);
                      removeFile(file.id);
                    }}
                    className="p-1 hover:bg-slate-100 hover:text-red-500 rounded transition text-gray-400"
                    title="Remove attachment"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator Slider bar */}
              {file.status === "uploading" && (
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary transition-all duration-150 ease-out"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
