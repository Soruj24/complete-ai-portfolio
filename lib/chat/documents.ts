import path from "path";
import fs from "fs";
import { MultiFileLoader } from "@langchain/classic/document_loaders/fs/multi_file";
import { JSONLoader } from "@langchain/classic/document_loaders/fs/json";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";

export async function loadExtraContext(): Promise<string> {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) return "";
    const filesToLoad = ["personal.json", "about.txt", "skills.csv"]
      .map((f) => path.join(dataDir, f))
      .filter((f) => fs.existsSync(f));
    if (filesToLoad.length === 0) return "";
    const loader = new MultiFileLoader(filesToLoad, {
      ".json": (p: string) => new JSONLoader(p),
      ".txt": (p: string) => new TextLoader(p),
      ".csv": (p: string) => new TextLoader(p),
    });
    const docs = await loader.load();
    return docs.map((d: { pageContent: string }) => d.pageContent).join("\n\n");
  } catch (fileError) {
    console.error("Error loading extra files:", fileError);
    return "";
  }
}
