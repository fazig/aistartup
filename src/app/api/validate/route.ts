import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    // You can swap this for OPENAI_API_KEY later
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const apiUrl = process.env.GROQ_API_KEY 
      ? "https://api.groq.com/openai/v1/chat/completions" 
      : "https://api.openai.com/v1/chat/completions";
      
    const model = process.env.GROQ_API_KEY ? "llama3-8b-8192" : "gpt-4o";

    if (!apiKey) {
      // Mock response if no API key is provided yet, so the UI still works
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        result: `### 🚀 Market Fit Analysis\nYour idea to build "**${idea.substring(0, 100)}**" shows strong potential. The market is shifting towards efficient, automated solutions in this space.\n\n### 🥊 Potential Competitors\n- **Incumbent Solutions:** Established legacy systems that are slow to adapt.\n- **Niche Startups:** Smaller companies tackling parts of this problem.\n\n### ⚠️ Key Challenges\n- **Customer Acquisition:** Finding the exact target audience early on.\n- **Differentiation:** Ensuring your feature set stands out clearly against competitors.\n\n### 🎯 Verdict\n**Go for it!** Start by building a minimal viable product (MVP) focused on one core feature and test it with real users.`
      });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are an expert startup advisor and Y-Combinator partner. Validate the user's startup idea. Provide Market Fit Analysis, Potential Competitors, Key Challenges, and a Verdict. Be concise and use Markdown headers and bullet points." },
          { role: "user", content: `Please validate this startup idea: ${idea}` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("API responded with error: " + response.statusText);
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to validate idea. Please try again." }, { status: 500 });
  }
}
