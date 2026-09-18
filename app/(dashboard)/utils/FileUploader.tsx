import { useRef } from "react";

interface FileUploaderProps {
  value?: File[];
  onChange: (files: File[]) => void;
  error?: string;
  disabled?: boolean;

  label?: string;
  description?: string;

  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export function FileUploader({
  value = [],
  onChange,
  error,
  disabled = false,
  label = "Upload files",
  description = "Drag and drop files here or click to browse",
  accept = ".png,.jpg,.jpeg,.pdf,.zip,.doc,.docx",
  multiple = true,
  maxFiles = 5,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    // Single file mode
    if (!multiple) {
      onChange(newFiles.slice(0, 1));
      return;
    }

    // Multiple file mode
    const combinedFiles = [...value, ...newFiles];

    // Remove duplicates
    const uniqueFiles = combinedFiles.filter(
      (file, index, array) =>
        array.findIndex(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified,
        ) === index,
    );

    onChange(uniqueFiles.slice(0, maxFiles));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);

    // Allows the user to select the same file again
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) return;

    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove);

    onChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];

    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, unitIndex)).toFixed(2)} ${
      units[unitIndex]
    }`;
  };

  return (
    <div className="w-full space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-60"
            : "border-gray-300 hover:border-brand-primary/70 hover:bg-brand-primary/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
        />

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Drag & drop your file{multiple ? "s" : ""} here
          </p>

          <p className="text-sm text-gray-500">or click to browse</p>

          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
        </div>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center justify-between rounded-lg border bg-white p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-700">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile(index);
                }}
                disabled={disabled}
                className="ml-4 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
