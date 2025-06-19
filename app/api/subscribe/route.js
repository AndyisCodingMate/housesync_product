// app/api/subscribe/route.js
export async function POST(req) {
  console.log("Script URL:", process.env.GOOGLE_SCRIPT_URL);
  const { email } = await req.json();

  // Forward the request to your Express backend or Google Apps Script
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL; // Ensure this is set in your environment variables

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.text(); // or .json() if your script returns JSON

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Failed to subscribe",
          status: response.status,
          message: data,
        }),
        { status: response.status }
      );
    }

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/subscribe route:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

