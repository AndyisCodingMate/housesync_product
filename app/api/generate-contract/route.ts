export const runtime = "nodejs";

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility: Replace all {{variable}} with real values
function replacePlaceholders(template: string, values: Record<string, any>) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const cleanedKey = key.trim();
    return values[cleanedKey] ?? `{{${cleanedKey}}}`;
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // 1. Load contract template
    const contractPath = path.join(process.cwd(), "data", "contract.txt");
    const contractTemplate = await fs.readFile(contractPath, "utf-8");

    // 2. Get userId from request body
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    // 3. Fetch contract data from Supabase
    const { data, error } = await supabase
      .from("contracts") // <-- change this to your actual table name
      .select("tenant_name, rent_amount, start_date, address") // <-- fields to fill in
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      console.error("Supabase fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch contract data" });
    }

    // 4. Replace placeholders in the template
    const filledContract = replacePlaceholders(contractTemplate, data);

    // 5. (Optional) Call OpenAI to polish the contract
    const openAiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a legal assistant. Polish the provided contract but do not alter the values.",
        },
        {
          role: "user",
          content: `Here is a draft contract:\n\n${filledContract}`,
        },
      ],
      temperature: 0.3,
    });

    const finalContract = openAiResponse.choices?.[0]?.message?.content;

    if (!finalContract) {
      return res.status(500).json({ error: "OpenAI did not return a response" });
    }

    return res.status(200).json({ contract: finalContract });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
