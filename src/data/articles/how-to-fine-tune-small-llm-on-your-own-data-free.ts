import { BlogPost } from "../posts";
export const postHowToFineTuneSmallLlmOnYourOwnDataFree: BlogPost = {
  slug: "how-to-fine-tune-small-llm-on-your-own-data-free",
  title: "How to Fine-Tune a Small LLM on Your Own Data Free",
  description: "Fine-tune a small LLM on your data for free: format your examples, train LoRA adapters with Unsloth on a free Colab GPU, and run it locally in Ollama.",
  date: "September 25, 2026",
  readTime: "8 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/how-to-fine-tune-small-llm-on-your-own-data-free_cover.webp",
  content: `![How to Fine-Tune a Small LLM on Your Own Data Free](/how-to-fine-tune-small-llm-on-your-own-data-free_cover.webp)

Fine-tuning used to mean a workstation full of GPUs and a training budget. With LoRA adapters and free cloud GPUs, you can now teach a small open model your own writing style, product docs, or domain knowledge in an afternoon — and spend nothing.

## Pick a small base model

You are not training a model from scratch. You start from an open-weights instruction model and teach it your patterns with a few hundred to a few thousand examples.

For a free Colab T4 GPU (about 15–16 GB of VRAM), models in the 1B–8B range work well with 4-bit quantization: Llama 3.2 1B/3B, Qwen 2.5 or Qwen 3 variants around 1.5B–7B, Gemma 3 1B/4B, or Phi-3/Phi-4 mini. Smaller models train faster and export to files you can actually run on a laptop; 7–8B models produce noticeably better writing but take longer.

Start with a 1B–3B instruct model for your first run. If the results look promising, repeat the exact same workflow on a 7–8B model — nothing about the process changes except training time.

## Build your dataset

Fine-tuning quality is almost entirely dataset quality. The format that works with most modern trainers is JSONL chat data — one JSON object per line:

\`\`\`json
{"messages": [{"role": "user", "content": "How do I reset my router?"}, {"role": "assistant", "content": "Unplug it for 30 seconds, then plug it back in..."}]}
{"messages": [{"role": "user", "content": "What's your refund policy?"}, {"role": "assistant", "content": "Full refund within 30 days of purchase..."}]}
\`\`\`

Rules that matter more than any hyperparameter:

- **200–2,000 examples is the sweet spot.** A few hundred clean examples beat ten thousand noisy ones.
- **Be consistent.** If two examples answer the same type of question in different styles, the model learns nothing — it averages them into mush.
- **Match the output format you want.** If you want bullet-point answers, write bullet-point answers in every example. The model copies the shape of your data.
- **Keep a holdout set.** Set aside 10–20% of your examples and never train on them. These are how you check the model actually learned instead of memorized.

You can assemble this from support tickets, docs, or your own writing. A spreadsheet exported to JSONL works fine.

## Option 1: Unsloth on a free Colab GPU (recommended)

Unsloth is the fastest path: open-source fine-tuning libraries with hand-written CUDA/Triton kernels that train roughly 2× faster and use 60–70% less VRAM than stock Hugging Face PEFT. Their ready-made Colab notebooks run on Google Colab's free T4 GPU — you install nothing locally.

The workflow:

1. Open Colab, set **Runtime → Change runtime type → T4 GPU**.
2. Open one of Unsloth's official SFT notebooks for a small model from their docs notebook list.
3. Upload your \`dataset.jsonl\` and point the data-loading cell at it instead of the example dataset.
4. Run the cells. The core of the notebook looks like this:

\`\`\`python
from unsloth import FastLanguageModel

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-3B-Instruct",
    max_seq_length=2048,
    load_in_4bit=True,  # QLoRA: frozen 4-bit base, trains only adapters
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
                    "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    use_gradient_checkpointing="unsloth",
)
\`\`\`

This uses **QLoRA**: the base model stays frozen in 4-bit precision while training only small LoRA adapter matrices. A 7–8B fine-tune fits in about 8–10 GB of VRAM — comfortably inside a free T4. The trainer is Hugging Face's standard \`SFTTrainer\` from TRL, so nothing about the training loop is exotic. A few hundred examples finish in roughly 10–30 minutes.

Colab's free tier has usage limits, so if a session gets cut off, reconnect and resume — your dataset and notebook are unchanged; only the running training step restarts.

## Option 2: LLaMA-Factory (no-code Web UI)

If notebooks make you uneasy, LLaMA-Factory offers a Gradio Web UI for fine-tuning 100+ open models. It supports LoRA/QLoRA, DPO preference tuning, and ships an official Colab notebook that also runs on the free tier. The whole pipeline — data upload, training config, evaluation, inference — happens through the browser UI instead of code.

This is the best choice if you want to experiment with settings visually before committing to a training run. It is heavier than Unsloth but far more approachable for non-programmers.

## Option 3: Axolotl (reproducible YAML)

Axolotl configures an entire fine-tune — preprocessing, training, evaluation, inference — from a single YAML file. It is free and open source, supports LoRA/QLoRA/DPO/RLHF across Llama, Qwen, Mistral, Gemma, Phi, and other families, and the community maintains copy-paste recipes for common setups. Choose Axolotl when you want a checked-in config file you can rerun exactly, or when you graduate to multi-GPU training later.

## Hyperparameters that matter

You do not need to become a training expert, but five settings decide most outcomes:

- **Rank (r): 16** — the size of the LoRA adapters. 8 is fine for a smoke test; go to 32–64 only for complex tasks.
- **Learning rate: 2e-4** — the standard starting point for LoRA/QLoRA.
- **Epochs: 1–3** — more passes over small data causes memorization, not learning.
- **Effective batch size: ~16** — achieved via gradient accumulation (e.g., batch 2 × accumulation 8), which saves VRAM versus raising the batch size directly.
- **Gradient checkpointing: on** — saves about 30% VRAM at a small speed cost; essential on free-tier GPUs.

Watch the training loss. If it drops below roughly 0.2 while your holdout examples stop improving, you are overfitting: cut epochs, lower the learning rate, or add more diverse data. Data quality always beats hyperparameter tweaking.

## Export and run it locally

After training you have two choices. Keep the small LoRA adapter folder (tens of megabytes) if you want to keep experimenting, or export a standalone model file. For running on your own machine, export to GGUF — the format llama.cpp, Ollama, and LM Studio expect:

\`\`\`python
# GGUF for Ollama / LM Studio (q4_k_m is the quality/size sweet spot)
model.save_pretrained_gguf("./gguf", tokenizer, quantization_method="q4_k_m")
\`\`\`

Then create it as an Ollama model with a Modelfile:

\`\`\`
FROM ./q4_k_m.gguf
PARAMETER temperature 0.7
SYSTEM "You are a helpful support assistant for Acme Corp. Answer concisely."
\`\`\`

\`\`\`bash
ollama create my-assistant -f Modelfile
ollama run my-assistant
\`\`\`

The GGUF export takes another 10–15 minutes in the notebook, then you download one file and you are done — no GPU needed ever again.

## Check it actually learned something

Before you celebrate, test against your holdout set:

1. **Same prompts, compare outputs.** Run holdout questions through the base model and your fine-tuned model side by side. You should see your style, terminology, and answer formats reflected.
2. **Probe edge cases.** Ask questions similar to but not in your training data. Parroting exact training answers is memorization; handling new phrasing is learning.
3. **Watch for damage.** Ask a few general-knowledge questions. Aggressive fine-tuning can degrade the base model's broad abilities — if it got dumber, train for fewer epochs.

If results disappoint, the fix is almost always the dataset: add more varied examples, remove contradictory ones, and try again. A second training run costs you nothing but time.

## Mistakes that waste your free GPU hours

- **Training on messy data.** Duplicates, contradictions, and mixed answer formats teach the model inconsistency. Clean the dataset first.
- **Using a huge model for a style task.** If you only want the model to write in your tone or format, 1B–3B is plenty. Save 7B+ for tasks needing deeper reasoning.
- **Skipping the adapter-first approach.** Full fine-tuning updates every parameter and will not fit a free GPU. LoRA/QLoRA is the entire reason this works for free.
- **No baseline comparison.** Without testing the base model on your holdout set, you cannot tell whether fine-tuning helped at all.
- **Forgetting session limits.** Free Colab and Kaggle GPUs time out. Save checkpoints and adapters to Drive or download them before the session ends.

## Key takeaways

- A small open model (1B–8B) plus a few hundred clean examples is enough for style, tone, and domain-knowledge fine-tuning.
- Unsloth's free Colab notebooks are the fastest route: QLoRA training on a free T4 GPU, roughly 2× faster than stock PEFT.
- LLaMA-Factory suits no-code users with its Web UI; Axolotl suits reproducible YAML-based workflows.
- Rank 16, learning rate 2e-4, 1–3 epochs, and gradient accumulation are safe starting settings.
- Export to GGUF and load it into Ollama for free local inference — no GPU required afterward.
- Dataset consistency decides the result; overfitting (train loss under ~0.2 with stalling holdout quality) means cut epochs or add data.
`,
};
