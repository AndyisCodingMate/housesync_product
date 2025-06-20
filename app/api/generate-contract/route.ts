import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const contractPath = path.join(process.cwd(), "data", "contract.txt");
    const contractTemplate = await fs.readFile(contractPath, "utf-8");

    const apiRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a legal assistant that fills out contract templates. Replace all placeholders like 'default_username', 'default_date', and 'default_address' with realistic values.",
          },
          {
            role: "user",
            content: `Here is a contract template:\n\n${contractTemplate}\n\nPlease fill in the placeholders.`,
          },
        ],
      }),
    });

    const result = await apiRes.json();
    const edited = result.choices?.[0]?.message?.content;

    res.status(200).json({ editedContract: edited });
  } catch (error) {
    console.error("DeepSeek error:", error);
    res.status(500).json({ error: "Failed to generate contract" });
  }
}
