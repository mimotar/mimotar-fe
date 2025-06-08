export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error("Invalid base64 string: MIME type not found.");
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]); // decode base64
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
