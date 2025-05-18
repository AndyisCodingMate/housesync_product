// app/api/subscribe/route.js
export async function POST(req) {
  console.log("Script URL:", process.env.GOOGLE_SCRIPT_URL);
  const { email } = await req.json();

  // Forward the request to your Express backend or Google Apps Script
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL; // Ensure this is set in your environment variables

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.text(); // or .json() if your script returns JSON

  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
