import { IPersistedAttachment } from "../types/ITicket";

export function base64ToFile(attachment: IPersistedAttachment): File {
  const byteString = atob(attachment.base64Url.split(",")[1]);

  const mimeString = attachment.base64Url
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });

  return new File([blob], attachment.name, {
    type: attachment.type,
    lastModified: attachment.lastModified,
  });
}
