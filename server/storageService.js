import { config } from 'dotenv';

config();

/**
 * Normalizes the SeaweedFS Filer URL from environment variables.
 * Prioritizes SEAWEEDFS_FILER_URL, then SEAWEEDFS_MASTER_URL.
 */
export function getSeaweedFSFilerUrl() {
  const url = process.env.SEAWEEDFS_FILER_URL || process.env.SEAWEEDFS_MASTER_URL;
  if (!url) {
    throw new Error('SeaweedFS Filer URL is not configured (missing SEAWEEDFS_FILER_URL in .env).');
  }
  return url.replace(/\/+$/, '');
}

/**
 * Sanitizes a filename for storage.
 * @param {string} originalName 
 * @returns {string}
 */
export function sanitizeFileName(originalName = 'upload') {
  return originalName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_');
}

/**
 * Uploads a binary buffer or string directly to SeaweedFS Filer.
 * @param {Buffer | ArrayBuffer | Uint8Array} buffer 
 * @param {string} originalName 
 * @param {string} mimeType 
 * @param {string} [folder='uploads'] 
 * @returns {Promise<{ url: string; path: string; fileName: string; fileSize: number; mimeType: string; storageProvider: string }>}
 */
export async function uploadToSeaweedFS(buffer, originalName, mimeType = 'application/octet-stream', folder = 'uploads') {
  const filerBaseUrl = getSeaweedFSFilerUrl();
  const safeName = sanitizeFileName(originalName);
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const uniqueFileName = `${timestamp}_${randomSuffix}_${safeName}`;
  const relativePath = `/rekula/${folder}/${uniqueFileName}`;
  const uploadUrl = `${filerBaseUrl}${relativePath}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
      },
      body: buffer,
    });

    if (!response.ok && response.status !== 201) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`SeaweedFS responded with status ${response.status}: ${errorText}`);
    }

    const fileSize = Buffer.isBuffer(buffer)
      ? buffer.length
      : buffer.byteLength || (typeof buffer === 'string' ? Buffer.byteLength(buffer) : 0);

    return {
      url: uploadUrl,
      path: relativePath,
      fileName: originalName,
      fileSize,
      mimeType,
      storageProvider: 'seaweedfs',
    };
  } catch (error) {
    console.error('[SeaweedFS Upload Error]:', error.message);
    throw new Error(`Failed to upload file to SeaweedFS storage: ${error.message}`);
  }
}

/**
 * Deletes a file from SeaweedFS Filer.
 * @param {string} fileUrlOrPath 
 * @returns {Promise<boolean>}
 */
export async function deleteFromSeaweedFS(fileUrlOrPath) {
  const filerBaseUrl = getSeaweedFSFilerUrl();
  const fullUrl = fileUrlOrPath.startsWith('http')
    ? fileUrlOrPath
    : `${filerBaseUrl}${fileUrlOrPath.startsWith('/') ? '' : '/'}${fileUrlOrPath}`;

  try {
    const response = await fetch(fullUrl, { method: 'DELETE' });
    return response.ok || response.status === 204;
  } catch (error) {
    console.error('[SeaweedFS Delete Error]:', error.message);
    return false;
  }
}

/**
 * Checks connectivity to SeaweedFS Filer.
 */
export async function checkSeaweedFSHealth() {
  const filerBaseUrl = getSeaweedFSFilerUrl();
  try {
    const response = await fetch(filerBaseUrl);
    return {
      status: response.ok ? 'healthy' : 'degraded',
      storage: 'SeaweedFS Filer',
      endpoint: filerBaseUrl,
      httpStatus: response.status,
    };
  } catch (err) {
    return {
      status: 'unreachable',
      storage: 'SeaweedFS Filer',
      endpoint: filerBaseUrl,
      error: err.message,
    };
  }
}
