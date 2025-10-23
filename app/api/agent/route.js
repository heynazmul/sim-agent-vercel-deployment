export default async function handler(req, res) {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // or another model you want from OpenRouter
        messages: [
          { role: 'system', content: 'You are Sim AI, a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${await response.text()}`);
    }

    const data = await response.json();
    const aiText = data.choices[0].message.content;
    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ text: "Error: " + error.message });
  }
}
