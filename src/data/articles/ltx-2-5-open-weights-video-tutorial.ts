import { BlogPost } from "../posts";
export const postLtx25OpenWeightsVideoTutorial: BlogPost = {
  slug: "ltx-2-5-open-weights-video-tutorial",
  title: "LTX-2.5 Open Weights Video Tutorial (2026 Setup)",
  description: "LTX-2.5 is Lightricks' open-weights video model with native audio. This tutorial covers download, ComfyUI setup, text-to-video, image-to-video, and multi-shot workflows.",
  date: "October 20, 2026",
  readTime: "6 min read",
  category: "How-To Guides",
  author: "Faizan Arif",
  image: "/ltx-2-5-open-weights-video-tutorial_cover.webp",
  content: `![LTX-2.5 Open Weights Video Tutorial (2026 Setup)](/ltx-2-5-open-weights-video-tutorial_cover.webp)

Most AI video generators are closed and API-only: you send a prompt, pay per second, and never touch the model. LTX-2.5, released by Lightricks on 11 August 2026, is the exception. It is an open-weights 22B world model for video generation that you can download and run on your own hardware — and unlike most open video models, it generates synchronised video and audio in a single pass. This tutorial walks through what it is, what you need to run it, and the practical workflows for your first generations.

## What LTX-2.5 actually is

LTX-2.5 is the latest release in Lightricks' LTX family, superseding LTX-2 and LTX-2.3 in the official setup instructions. Three things define it:

- **Synchronised audio and video.** The API documentation describes generation of "synchronized video and audio from a text prompt in a single pass", with native audio included at every resolution. Dialogue, ambience, and motion come out together — no separate voice-over step.
- **Native multi-shot scenes.** It can produce a sequence of distinct shots that stay visually consistent across cuts in one inference pass, rather than forcing you to generate clips separately and stitch them.
- **A diffusion-based video decoder.** Instead of a fixed VAE decoder, LTX-2.5 uses a diffusion process to decode latents into pixels, recovering fine detail that high-compression latent spaces normally discard — without a separate upscaling stage.

It also supports text-to-video, image-to-video, video-to-video, keyframe interpolation, audio-conditioned generation, real-footage editing, and HDR/OpenEXR workflows for film pipelines.

## Licence: read this before commercial use

Lightricks publishes LTX-2.5 under the LTX-2.x Community License: free use for entities under $10M in annual revenue, with larger organisations needing a paid licence. Weights are downloadable from Hugging Face (access requires accepting the terms), with code and setup instructions in the official LTX-2 GitHub repository. Note that the community licence does not apply in the EU, UK, or South Korea — check the current licence text for your region before deploying commercially.

## Step 1: Check your hardware

The official quick start downloads a distilled transformer, a fine-tuned Gemma 4 text encoder, video and audio VAEs, and a spatial upscaler totalling roughly 66 GiB. This is not a laptop-on-the-couch model: you want a strong NVIDIA GPU with generous VRAM, fast SSD storage for the checkpoints, and CPU/disk offloading configured sensibly. The distilled checkpoints are the faster path for local generation; full checkpoints are for production-quality work. Plan checkpoint storage, VRAM, decoding backend, and offload settings as part of your setup.

## Step 2: Get the weights and code

1. Create a Hugging Face account and request access to the LTX-2.5 weight repositories, accepting Lightricks' terms.
2. Clone the official LTX-2 repository from GitHub — it is now the home of the LTX-2.5 setup instructions and inference code.
3. Follow the repository's quick start to download the distilled transformer, Gemma 4 encoder, video and audio VAEs, and upscaler (~66 GiB total).

## Step 3: Generate your first clip (text-to-video)

The simplest workflow is text-to-video with audio on:

1. Open the repository's text-to-video pipeline with the distilled checkpoint.
2. Write a prompt that describes action and sound, for example: "a surfer riding a wave at sunset, gulls calling, waves crashing".
3. Choose a mode: **Fast** for drafts and iteration, **Pro** for finished clips — Pro costs more time per frame but visibly cleaner motion.
4. Enable audio generation so the single pass produces both picture and sound.
5. Record the exact checkpoint, pipeline, commit, prompt, dimensions, frame count, and hardware for every result you keep — open-weights workflows are only reproducible if you log them.

Wikipedia's technical summary reports LTX-2.5 can generate 10 seconds of video in under 7 seconds on capable hardware.

## Step 4: Try image-to-video and multi-shot

Once text-to-video works, two workflows set LTX-2.5 apart:

- **Image-to-video.** Supply a starting image (a product shot, a storyboard frame) plus a motion prompt. The model animates the image while preserving its look.
- **Multi-shot.** Write a prompt describing a sequence of connected shots. The model generates the shots with continuity across cuts — useful for a scene with a wide establishing shot, a medium action shot, and a close-up, all without manual stitching.

## Step 5: Edit real footage

LTX-2.5 also supports editing captured video rather than replacing it entirely. This is the post-production use case: feed it an existing clip and a prompt describing the change (relight a scene, change a background), and it modifies the footage while keeping motion consistent. For HDR workflows, export to OpenEXR, the high-dynamic-range format used in professional film and VFX pipelines — rare among generative video models and a sign Lightricks wants LTX-2.5 in real production stacks.

## Troubleshooting and tips

- **Out of memory:** switch from the full checkpoint to the distilled checkpoint, reduce resolution, and enable CPU/disk offload as documented in the repo.
- **Bad motion:** cleaner results come from Pro mode and explicit duration settings rather than long, vague prompts.
- **Audio mismatch:** keep prompts audio-aware — mention the sounds you expect in the scene.
- **Slow iteration:** draft in Fast mode, then re-run only the prompts that work in Pro. That is the workflow hosted services built around LTX-2.5 use too.
- **No GPU?** The open weights are optional. Lightricks also offers hosted API access to LTX-2.5 for developers who want the model's capabilities without the hardware.

## Key takeaways

- LTX-2.5 is Lightricks' open-weights 22B video model (Aug 2026) with synchronised audio-video generation in a single pass.
- It is free to use under $10M annual revenue under the LTX-2.x Community License, with a paid licence above that.
- The ~66 GiB quick start needs a strong GPU and fast storage; use distilled checkpoints for speed.
- Standout workflows are native multi-shot scenes, image-to-video, and real-footage editing with HDR/OpenEXR export.
- Log checkpoint, commit, prompt, and hardware for every retained result so your generations stay reproducible.
`,
};
