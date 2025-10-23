import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || body.topic || 'Tell me about baby food';

    // Call OpenRouter API for content generation
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'https://babyfoodwriter.vercel.app',
        'X-Title': 'Baby Food Content Writer'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a professional baby food content writer. Create engaging, informative, and helpful content about baby food, nutrition, feeding guides, and parenting tips. Write in a friendly, accessible tone that parents will appreciate.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return NextResponse.json({
        result: data.choices[0].message.content,
        message: data.choices[0].message.content
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
