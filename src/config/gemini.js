async function run(prompt) {
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Gemini API request failed");
    }

    return data.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
}

export default run;