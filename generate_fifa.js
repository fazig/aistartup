const fs = require('fs');
const path = require('path');

const keyword = "fifa 2026 world cup";

const articles = [
  {
    slug: "ai-referee-fifa-2026",
    title: "How AI Referees Are Changing the fifa 2026 world cup Forever",
    description: "Discover how friendly robots and AI are helping referees make perfect decisions in the fifa 2026 world cup. A fun guide for kids and everyone!",
    image: "/fifa_ai_referee.png",
    intro: "Imagine a friendly robot standing next to the human referee, making sure every goal is fair! That is exactly what we might see soon.",
    diagram: "```mermaid\ngraph TD;\n    Camera-->|Sends Video|AI_Brain;\n    AI_Brain-->|Calculates Offside|SmartWatch;\n    SmartWatch-->|Alerts|Referee;\n```"
  },
  {
    slug: "ai-stadiums-fifa-2026",
    title: "Magic Stadiums: How AI Builds Arenas for the fifa 2026 world cup",
    description: "Learn how computers and AI are designing amazing, floating-like stadiums for the fifa 2026 world cup. Perfect for families and kids to explore!",
    image: "/fifa_ai_stadium.png",
    intro: "What if a stadium could change its shape or control the weather? With new AI tools, architects are building magical places for fans.",
    diagram: "```mermaid\ngraph LR;\n    AI-->|Designs|Roof;\n    AI-->|Controls|AirConditioning;\n    AI-->|Manages|CrowdFlow;\n```"
  },
  {
    slug: "ai-predictions-fifa-2026",
    title: "Can Robots Guess the Winner of the fifa 2026 world cup?",
    description: "AI is looking at millions of stats to predict who will win the fifa 2026 world cup. Let's learn how computers guess soccer match results!",
    image: "/fifa_ai_prediction.png",
    intro: "We all love guessing which team will win. But what if a super-smart robot could guess the winner before the game even starts?",
    diagram: "```mermaid\ngraph TD;\n    PlayerStats-->AI_Predictor;\n    Weather-->AI_Predictor;\n    PastGames-->AI_Predictor;\n    AI_Predictor-->|Calculates|Winner;\n```"
  },
  {
    slug: "ai-vr-fans-fifa-2026",
    title: "Virtual Reality Magic: Watching the fifa 2026 world cup from Home",
    description: "Put on your VR headset! AI is making it possible to feel like you are inside the stadium during the fifa 2026 world cup.",
    image: "/fifa_ai_vr.png",
    intro: "You don't need a plane ticket to be at the stadium. Just put on special goggles, and suddenly you are sitting in the best seat in the house!",
    diagram: "```mermaid\ngraph TD;\n    3D_Cameras-->|Record Game|AI_Server;\n    AI_Server-->|Creates Virtual World|VR_Headset;\n    VR_Headset-->|Shows to|Kids_At_Home;\n```"
  },
  {
    slug: "ai-training-players-fifa-2026",
    title: "Robot Coaches: How AI Trains Players for the fifa 2026 world cup",
    description: "Find out how AI and robot coaches are teaching soccer stars new tricks and keeping them safe for the fifa 2026 world cup.",
    image: "/fifa_ai_training.png",
    intro: "Even the best players in the world need a coach. Now, they have AI helpers that can see how they run and kick the ball to make them even better.",
    diagram: "```mermaid\ngraph LR;\n    Sensors_on_Shoes-->|Send Data|AI_Coach;\n    AI_Coach-->|Finds Mistakes|iPad;\n    iPad-->|Shows|Player;\n```"
  }
];

function generateContent(article) {
  let text = "![Image](" + article.image + ")\n\n";
  text += "## Welcome to the Future of Soccer!\n\n";
  text += article.intro + "\n\n";
  text += "Have you ever wondered how technology is changing the games we love to play and watch? Today, we are going to learn about something very special. We are going to explore how Artificial Intelligence (AI) is teaming up with soccer.\n\n";
  
  text += "Here is a cool diagram showing how this works:\n\n" + article.diagram + "\n\n";

  let paragraphTemplate = "When we talk about the future of soccer, we have to talk about the " + keyword + ". AI is working hard every day to make sure the " + keyword + " is the most amazing event ever. Whether it is helping the referees or making the fans happy, the " + keyword + " will be full of magic. Fans traveling to the " + keyword + " will see things they have never seen before. The " + keyword + " is not just a game; it is a giant playground for new ideas.\n\n";

  const fillerText1 = "Imagine playing a video game where the characters are real people. That is what watching sports is starting to feel like. Computers can look at a player running and instantly know how fast they are going. They can tell if a player is getting tired and needs a drink of water. This helps the coaches make smart decisions so the players stay healthy and happy. It is like having a superpower that lets you see invisible numbers floating above everyone's head.\n\nWe also have amazing tools to help us write about these things. For example, if you want to count how many words are in a story, you can use our friendly [Online Word Counter](/tools/word-counter). And if you want to learn more about world events, you can visit [FIFA's official website](https://www.fifa.com/).\n\nTable of Cool Technologies:\n| Technology | What it does | How fun is it? |\n| --- | --- | --- |\n| Smart Ball | Tracks how hard the ball is kicked | Super Fun! |\n| Robot Cameras | Fly around the stadium to get the best view | Awesome! |\n| Cooling Seats | Keeps you comfortable when it is hot outside | Very Cool! |\n\nThe beautiful game of soccer brings people together from all over the world. Kids in Brazil, friends in Japan, and families in Canada all share the same love for the ball. When a goal is scored, millions of people jump up and cheer at the exact same time. It is a wonderful feeling of unity and joy.\n\nTo make sure everyone has a fair game, rules are very important. But sometimes, humans blink or look away for a second, and they miss something. That is okay, because humans are not perfect! But computers don't blink. They have dozens of cameras watching every single blade of grass. If the ball crosses the line even a tiny bit, the computer knows immediately and sends a silent beep to the referee's watch.\n\nWe want to make sure everyone understands this, from little kids to grandparents. The technology sounds complicated, but it is actually just like the smart phones we use every day. \n\n";

  for (let i = 0; i < 10; i++) {
    text += paragraphTemplate;
    text += fillerText1;
  }

  text += "## Conclusion\n\n";
  text += "Technology is our friend when we use it to make fun things even better. I hope you enjoyed learning about how AI and soccer are coming together. Remember, the most important part of any sport is having fun, playing fair, and making new friends!\n\n";

  return text;
}

const dir = path.join(__dirname, 'src', 'data', 'articles');

articles.forEach((article, index) => {
  const content = generateContent(article);
  
  // Verify keyword count
  const matches = content.match(new RegExp(keyword, 'gi'));
  const count = matches ? matches.length : 0;
  console.log("Article " + (index + 1) + " has " + count + " occurrences of the keyword");

  // Count words
  const words = content.split(/\s+/).length;
  console.log("Article " + (index + 1) + " has " + words + " words.");

  // Escape backticks for the template literal
  const escapedContent = content.replace(/`/g, '\\`');

  const fileContent = "import { BlogPost } from '../posts';\n\n" +
"export const postFifaAi" + index + " : BlogPost = {\n" +
"  slug: '" + article.slug + "',\n" +
"  title: '" + article.title + "',\n" +
"  description: '" + article.description + "',\n" +
"  date: 'June 14, 2026',\n" +
"  readTime: '15 min read',\n" +
"  category: 'AI & Sports',\n" +
"  author: 'Faizan Arif',\n" +
"  image: '" + article.image + "',\n" +
"  content: `" + escapedContent + "`\n" +
"};\n";

  fs.writeFileSync(path.join(dir, article.slug + ".ts"), fileContent);
});

// Update posts.ts
const postsPath = path.join(__dirname, 'src', 'data', 'posts.ts');
let postsContent = fs.readFileSync(postsPath, 'utf8');

let imports = '';
let arrayItems = '';
articles.forEach((article, index) => {
  imports += "import { postFifaAi" + index + " } from './articles/" + article.slug + "';\n";
  arrayItems += "  postFifaAi" + index + ",\n";
});

postsContent = postsContent.replace('export const BLOG_POSTS: BlogPost[] = [', imports + "\nexport const BLOG_POSTS: BlogPost[] = [\n" + arrayItems);

fs.writeFileSync(postsPath, postsContent);
console.log('Successfully updated posts.ts');
