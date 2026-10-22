export interface UploadResult {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageProvider: string;
}

/**
 * Uploads a file to the SeaweedFS private storage cluster via /api/upload.
 * Converts the file to Base64 in chunks and sends it securely to the backend.
 *
 * @param file The browser File object
 * @param folder Destination directory inside the SeaweedFS bucket
 * @returns Upload result with permanent SeaweedFS file URL
 */
export async function uploadFileToSeaweed(
  file: File,
  folder: string = 'uploads'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const fileBase64 = reader.result as string;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileBase64,
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            folder,
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Unable to store file on SeaweedFS storage. Please try again.'
          );
        }

        resolve({
          url: data.url,
          fileName: data.fileName,
          fileSize: data.fileSize,
          mimeType: data.mimeType,
          storageProvider: data.storageProvider || 'seaweedfs',
        });
      } catch (err: any) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file from your local filesystem.'));
    };

    reader.readAsDataURL(file);
  });
}
