import { Code, Terminal } from "lucide-react";

export const sdks = [
  { name: "Python", icon: Code, color: "text-accent", bg: "bg-accent/10", version: "1.2.0", updated: "2d ago" },
  { name: "TypeScript", icon: Terminal, color: "text-purple-500", bg: "bg-purple-500/10", version: "1.1.0", updated: "5d ago" },
  { name: "Go", icon: Code, color: "text-success", bg: "bg-success/10", version: "0.9.0", updated: "1w ago" },
  { name: "Rust", icon: Terminal, color: "text-amber-500", bg: "bg-amber-500/10", version: "0.8.0", updated: "2w ago" },
];

export const installCommands = [
  { lang: "Python", cmd: "pip install ai-sdk" },
  { lang: "TypeScript", cmd: "npm install @ai-sdk/client" },
  { lang: "Go", cmd: "go get github.com/ai-sdk/go" },
  { lang: "Rust", cmd: "cargo add ai-sdk" },
];

export const codeSnippets: Record<string, string> = {
  python: `from ai_sdk import AIClient

client = AIClient(
    api_key="sk-...",
    base_url="https://api.example.com"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    stream=True
)

for chunk in response:
    print(chunk.delta.content, end="")`,
  typescript: `import { AIClient } from "@ai-sdk/client";

const client = new AIClient({
  apiKey: process.env.AI_API_KEY,
  baseURL: "https://api.example.com",
});

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ],
  stream: true,
});

for await (const chunk of response) {
  process.stdout.write(chunk.delta.content);
}`,
  go: `package main

import (
    "fmt"
    "github.com/ai-sdk/go"
)

func main() {
    client := aisdk.NewClient("sk-...")
    
    resp, err := client.Chat.Create(
        context.Background(),
        &aisdk.ChatRequest{
            Model: "gpt-4o",
            Messages: []aisdk.Message{
                {Role: "system", Content: "You are a helpful assistant."},
                {Role: "user", Content: "Hello!"},
            },
            Stream: true,
        },
    )
    
    for chunk := range resp.Stream() {
        fmt.Print(chunk.Delta.Content)
    }
}`,
  rust: `use ai_sdk::{AIClient, ChatRequest};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = AIClient::new("sk-...")?;
    
    let response = client.chat()
        .model("gpt-4o")
        .message("system", "You are a helpful assistant.")
        .message("user", "Hello!")
        .stream()
        .await?;
    
    let mut output = String::new();
    while let Some(chunk) = response.next().await {
        output.push_str(&chunk.delta.content);
    }
    println!("{}", output);
    Ok(())
}`,
};
