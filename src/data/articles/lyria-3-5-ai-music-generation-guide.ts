import { BlogPost } from "../posts";

export const postLyria35AiMusicGenerationGuide: BlogPost = {
  slug: "lyria-3-5-ai-music-generation-guide",
  title: "Lyria 3.5 AI Music Generation Guide (2026)",
  description: "Lyria 3.5 AI music generation guide: create full songs with vocals in the Gemini app or via the Gemini API, with pricing, prompt tips, and key limits.",
  date: "October 20, 2026",
  readTime: "7 min read",
  category: "AI Tools",
  author: "Faizan Arif",
  image: "/lyria-3-5-ai-music-generation-guide_cover.webp",
  content: `![Lyria 3.5 AI Music Generation Guide (2026)](/lyria-3-5-ai-music-generation-guide_cover.webp)

Google DeepMind's Lyria 3.5 is the most capable AI music model Google has shipped: it writes and performs full-length songs with vocals, lyrics, and arrangements from a text prompt, outputting 44.1 kHz stereo audio. It first appeared inside Flow Music on 29 July 2026, then rolled out more broadly on 4 September 2026 through the Gemini app, Google AI Studio, and the Gemini API. This guide covers both ways to use it, what it costs, how to prompt it well, and where its limits are.

## What Lyria 3.5 actually generates

Lyria 3.5 is the successor to Lyria 3, improved across musicality, lyric quality, vocal expression, and control over tempo and duration. Instead of repeating a short melodic loop, it produces complete songs with distinct verses, choruses, and bridge sections, arranged before performance — an arrangement it effectively reasons out first. Outputs are full stereo at 44.1 kHz, which is proper production-ready resolution rather than demo-quality audio.

There are two variants aimed at different production stages:

- **Lyria 3.5 Clip** (model id lyria-3.5-clip-preview): fixed 30-second MP3 outputs. These are loops, previews, and the cheap way to test a prompt. Costs $0.04 per clip on the API.
- **Lyria 3.5 Pro** (model id lyria-3.5 or lyria-3.5-pro-preview): multi-minute songs lasting around two minutes, with duration influenced through your prompt. Costs $0.08 per full song on the API, and it is the only variant that can return WAV.

There is no free API tier, and billing is per generation — failed takes still cost money. That pricing structure shapes the smart workflow: iterate cheaply, commit sparingly.

## Option 1: make music in the Gemini app

The fastest route needs no code. Open the Gemini app on web or mobile and you can now generate music directly by describing it. You pick a genre or describe it in words, specify vocals or instrumental, and choose between a short clip or a longer track. Ready-made templates help beginners get started — background music for a video, a custom promotional jingle, or even a personal ringtone are the canonical use cases.

This is also the right place to refine your prompts. Lyria 3.5 generation is single-turn: you cannot edit a generated song with follow-up prompts, so if you do not like a result you generate again from a revised prompt. Sketching in the Gemini app teaches you which instructions reliably produce the mood, tempo, and arrangement you want, without spending API budget. Once the prompt is settled, you can export only the final track through the API for production use.

## Option 2: generate music with the Gemini API

For developers, Lyria 3.5 is available through the Gemini API using the Interactions API. The call looks like any other Gemini SDK request. Here is the Python quick start from Google's official music generation docs:

import base64
from google import genai
client = genai.Client()
interaction = client.interactions.create(
    model="lyria-3.5",
    input="A melancholic jazz fusion track in D minor, " +
          "featuring a smooth saxophone melody, walking bass line, " +
          "and complex drum rhythms.",
)
generated_audio = interaction.output_audio
if generated_audio:
    with open("interaction_output.mp3", "wb") as f:
        f.write(base64.b64decode(generated_audio.data))
    print("Audio saved to interaction_output.mp3")
lyrics = interaction.output_text
if lyrics:
    print(f"Lyrics:\n{lyrics}")

The response carries the audio as base64 alongside the generated lyrics as text. Equivalent calls exist in JavaScript via the @google/genai package and in raw REST:

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
-H "Content-Type: application/json" \
-H "x-goog-api-key: $GEMINI_API_KEY" \
-d '{
    "model": "lyria-3.5",
    "input": "A melancholic jazz fusion track in D minor, featuring a smooth saxophone melody, walking bass line, and complex drum rhythms."
}'

You will need a Gemini API key from Google AI Studio, and billing enabled, since the music endpoints have no free tier. The best practice from Google's own docs is to iterate with the 30-second Clip model first, then render the keeper on the full Lyria 3.5 model.

## How to prompt Lyria 3.5 for better songs

Vague prompts produce generic results. Google's prompting guide for the model recommends:

- **Be specific.** Name instruments, BPM, key, mood, and structure. "A melancholic jazz fusion track in D minor, featuring a smooth saxophone melody, walking bass line, and complex drum rhythms" will beat "a sad jazz song" every time.
- **Use section tags.** Marking sections with [Verse], [Chorus], and [Bridge] gives the model clear structure to follow, so the output has a real song arc rather than a wash of sound.
- **Separate lyrics from instructions.** When you supply custom lyrics, clearly separate them from your musical direction. This is the single biggest factor in the model singing what you wrote rather than paraphrasing it.
- **Match your language.** Prompt in the language you want the lyrics in. There is no separate language setting; the prompt language sets the lyric language, and the model adapts vocal style and pronunciation to match.
- **Use images as mood input.** Lyria 3.5 accepts multimodal inputs — up to 10 images alongside a text prompt — and composes music shaped by the visual mood. This is useful for scoring game scenes or videos when words are hard to find.

The prompt language also works across genres you would not expect from a text model: instrumental-only requests ("instrumental only, no vocals") are the normal approach for game audio and background beds that dialogue has to sit on top of.

## Pricing and the clip-first workflow

The API pricing is simple but unforgiving: $0.04 per 30-second clip, $0.08 per full song, no free tier, and every generation is billed including failed takes. The working pattern the pricing implies is the one independent guides and Google's own docs both converge on: iterate on Clip, render the keeper on 3.5. Sketch prompts in the Gemini app for free, lock the prompt, then spend API calls only on the final export.

For comparison, that makes a finished background track for a YouTube video cost less than ten cents in API fees — but it also means batch-generating dozens of candidate songs through the API will quietly add up. Track your generations the way you would any billed resource.

## Limitations to know before you rely on it

- **Single-turn generation.** You cannot refine a generated song through follow-up prompts. To change anything, generate again with a revised prompt.
- **Safety filters.** All prompts are checked before generation. Prompts that request specific artist voices or the generation of copyrighted lyrics are blocked.
- **SynthID watermarking.** All generated audio carries an imperceptible SynthID audio watermark for identification. It does not affect the listening experience, but the music is identifiable as AI-generated — relevant for platforms and rights holders policing AI content floods.
- **Determinism.** Results vary between calls even with the same prompt, so save the keeper the moment you hear it.
- **Length.** Clip always returns exactly 30 seconds. The Pro model generates songs of around two minutes; exact duration is influenced through your prompt rather than set precisely.

## Key takeaways
- Lyria 3.5 is Google DeepMind's top-tier music model: full songs with vocals, lyrics, and 44.1 kHz stereo output from text or text-plus-image prompts.
- It is available in the Gemini app (web and mobile) for sketching and through the Gemini API via the Interactions API for production use.
- Use the $0.04 Lyria 3.5 Clip for prompt iteration, then render keepers on the $0.08 Pro model — there is no free API tier.
- Strong prompts name instruments, BPM, key, mood, and structure, and use [Verse], [Chorus], [Bridge] section tags for real song arcs.
- Keep custom lyrics clearly separated from musical direction, and prompt in the lyric language you want sung.
- Generation is single-turn with no refinement, prompts are safety-filtered, and all audio carries an inaudible SynthID watermark.
`,
};
