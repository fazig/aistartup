import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { module, input } = await request.json();

    if (!input || !module) {
      return NextResponse.json({ error: "Missing module or input" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const apiUrl = process.env.GROQ_API_KEY 
      ? "https://api.groq.com/openai/v1/chat/completions" 
      : "https://api.openai.com/v1/chat/completions";
    const modelId = process.env.GROQ_API_KEY ? "llama3-8b-8192" : "gpt-4o";

    let systemPrompt = "";
    if (module === "documind") {
      systemPrompt = "You are an enterprise data extraction AI. The user will provide raw text from an invoice or contract. Extract the key entities (Dates, Total Amounts, Vendor Names, Key Terms) and return them as a clean, structured Markdown list.";
    } else if (module === "marketscale") {
      systemPrompt = "You are an enterprise marketing AI. The user will provide a keyword or topic. Generate a highly professional, SEO-optimized outline for a whitepaper or blog post, including H1/H2 tags and targeted keywords.";
    } else if (module === "sentiment") {
      systemPrompt = "You are a customer sentiment analysis engine. The user will provide a batch of customer reviews. Categorize the overall sentiment (Positive/Neutral/Negative) with estimated percentages, and extract the top 3 feature requests or complaints in bullet points.";
    }

    if (!apiKey) {
      // Mock for UI preview if API keys aren't added yet
      await new Promise(r => setTimeout(r, 1500));
      let mockRes = "";
      if (module === "documind") mockRes = "### Extracted Data\n- **Vendor:** Acme Corp\n- **Date:** Oct 12, 2026\n- **Total Amount:** $4,250.00\n- **Terms:** Net 30\n\n*(Note: This is a mocked result. Add your GROQ_API_KEY or OPENAI_API_KEY in Vercel to activate real extraction).*";
      if (module === "marketscale") mockRes = "### SEO Content Outline\n**H1:** The Future of Enterprise Automation\n**H2:** How AI is Reshaping Data Entry\n**H2:** Key Benefits of Automation\n\n*(Note: This is a mocked result. Add your GROQ_API_KEY or OPENAI_API_KEY in Vercel to activate real extraction).*";
      if (module === "sentiment") mockRes = "### Sentiment Analysis\n- **Positive:** 75%\n- **Neutral:** 15%\n- **Negative:** 10%\n\n### Top Feedback Themes\n1. Users love the new interface.\n2. Requesting mobile app support.\n\n*(Note: This is a mocked result. Add your GROQ_API_KEY or OPENAI_API_KEY in Vercel to activate real extraction).*";
      
      return NextResponse.json({ result: mockRes });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ]
      })
    });

    if (!response.ok) throw new Error("API responded with error");
    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Processing failed. Check API keys." }, { status: 500 });
  }
}
