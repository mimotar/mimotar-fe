import { fileToBase64 } from "@/app/utils/FileToBase64";
import { base64ToFile } from "@/app/utils/base64ToFile";

export interface IPersistedAttachment {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  dataUrl: string;
}

export const isPersistedAttachment = (
  value: unknown,
): value is IPersistedAttachment => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as IPersistedAttachment).name === "string" &&
    typeof (value as IPersistedAttachment).type === "string" &&
    typeof (value as IPersistedAttachment).size === "number" &&
    typeof (value as IPersistedAttachment).lastModified === "number" &&
    typeof (value as IPersistedAttachment).dataUrl === "string"
  );
};

export const normalizeAttachments = (
  attachments: unknown,
): IPersistedAttachment[] => {
  if (!Array.isArray(attachments)) {
    return [];
  }

  return attachments.filter(isPersistedAttachment);
};

export const isSameAttachment = (
  left: IPersistedAttachment,
  right: IPersistedAttachment,
) => {
  return (
    left.name === right.name &&
    left.type === right.type &&
    left.size === right.size &&
    left.lastModified === right.lastModified
  );
};

export const serializeFilesToAttachments = async (files: File[]) => {
  return Promise.all(
    files.map(async (file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      dataUrl: await fileToBase64(file),
    })),
  );
};

export const attachmentsToFiles = (
  attachments: IPersistedAttachment[],
): File[] => {
  return attachments.map((attachment) =>
    base64ToFile(attachment.dataUrl, attachment.name, {
      lastModified: attachment.lastModified,
    }),
  );
};
