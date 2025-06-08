const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const isFileAcceptedSize = (files: FileList | null) => {
  if (!files) return { msg: "No files selected", error: true };

  if (files.length > MAX_FILES) {
    return {
      msg: `You can only upload up to ${MAX_FILES} files.`,
      error: true,
    };
  }

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > MAX_FILE_SIZE_BYTES) {
      return {
        msg: `Each file must be smaller than ${MAX_FILE_SIZE_MB}MB.`,
        error: true,
      };
    }
  }

  return false;
};
