export default async function handler(req, res) {
  const simApiKey = process.env.SIMLI_API_KEY;
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      'https://www.sim.ai/api/workflows/4334b894-60bb-4f0b-8635-44ab70bfff2b/execute',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': simApiKey
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: `session_${Date.now()}`
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Sim AI error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      return res.status(500).json({ text: 'ERROR: Sim AI did not return valid JSON.' });
    }

    const aiText = data.response || data.message || 'No response from Sim AI.';
    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ text: 'Error: ' + error.message });
  }
}
