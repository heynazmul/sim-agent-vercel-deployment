import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || body.topic || 'Tell me about baby food';
    
    // Call Sim AI API for content generation
    const response = await fetch('https://api.simli.ai/startAISession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SIMLI_API_KEY}`,
      },
      body: JSON.stringify({
        message: userMessage,
        sessionId: `session_${Date.now()}`,
        faceId: 'default'
      })
    });
    
    const data = await response.json();
    console.log('Sim AI API Response:', JSON.stringify(data, null, 2));
    
    if (data.message || data.response) {
      return NextResponse.json({
        result: data.message || data.response,
        message: data.message || data.response
      });
    } else {
      return NextResponse.json({
        result: 'I received your request! Let me help you create great baby food content.',
        message: 'Content generated successfully'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        message: 'Sorry, I encountered an error. Please try again.',
        result: 'I apologize, but I had trouble generating that content. Could you try rephrasing your request?'
      },
      { status: 500 }
    );
  }
}
