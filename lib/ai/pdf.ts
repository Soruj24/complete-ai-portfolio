const ALLOWED_EXTENSIONS = [".pdf", ".txt", ".doc", ".docx"] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileValidationError";
  }
}

export function validateFile(file: File): void {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext as typeof ALLOWED_EXTENSIONS[number])) {
    throw new FileValidationError(
      `Invalid file type "${ext}". Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`,
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new FileValidationError(
      `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 5MB`,
    );
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.name.toLowerCase().endsWith(".pdf")) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }
  return file.text();
}

export function getFileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
