export function detectLanguage(text: string): "english" | "bengali" {
  return /[\u0980-\u09FF]/.test(text) ? "bengali" : "english";
}
