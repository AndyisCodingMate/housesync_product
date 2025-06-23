import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const contractPath = path.join(process.cwd(), "data", "contract.txt");
    const contractTemplate = await fs.readFile(contractPath, "utf-8");

    const messages: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are a legal assistant that fills out contract templates. Replace placeholders like 'default_username', 'default_date', and 'default_address' with realistic values.",
      },
      {
        role: "user",
        content: `Here is a contract template:\n\n${contractTemplate}\n\nPlease fill in the placeholders.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0,
    });

    const editedContract = completion.choices?.[0]?.message?.content;

    if (!editedContract) {
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    res.status(200).json({ editedContract });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate contract" });
  }
}
