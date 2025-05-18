// newsletter.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  const scriptUrl = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.text(); // or .json() if your script returns JSON
  res.send(data);
});

app.listen(3001, () => console.log("Proxy running on port 3001"));
