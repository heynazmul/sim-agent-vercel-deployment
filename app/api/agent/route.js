import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message;

    // Call Sim AI API
    const response = await fetch('https://api.simli.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SIMLI_API_KEY}`
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId: `session_${Date.now()}`
      })
    });

    const data = await response.json();
    return NextResponse.json({ result: data.response || data.message || 'Response from Sim AI' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { result: 'Error connecting to Sim AI', error: error.message },
      { status: 500 }
    );
  }
}
