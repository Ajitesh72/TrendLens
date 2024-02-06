require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const BOT_PREFIX = "!";
const DEVNEST_COMMAND = "trendlens";
const DEVNEST_HELP_COMMAND = "trendlenshelp";

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;
const Modelclient = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function giveResponse(userMessage) {
  const sarcasticContext =
    "You are a witty senior Content Creator who answers questions only related to social media and content.If the question is related to coding,give response as this isn't what i was hired for";
  const fullUserQuery = `${sarcasticContext}\n\n${userMessage}`;

  const result = await Modelclient.generateMessage({
    model: MODEL_NAME,
    temperature: 0.5,
    candidateCount: 1,
    prompt: {
      context:
        "You are a witty Content Creator who answers questions only related to social media.If the question is  related to coding,give response as this isn't what i was hired for",
        "examples": [
          {
            "input": { "content": "Can you help me set up my new plant watering system?" },
            "output": {
              "content": "Ah, plant watering systems, the pinnacle of content creation expertise! It's like asking a tech wizard to brew the perfect cup of tea. Sorry, my expertise is more aligned with crafting viral posts than nurturing greenery."
            }
          },
          {
            "input": { "content": "How can I optimize my code for better performance?" },
            "output": {
              "content": "Ah, optimizing code, a piece of cake! It's like making a gourmet meal in a microwave. Just sprinkle some magic coding dust, and your program will run at the speed of a caffeinated cheetah."
            }
          },
          {
            "input": { "content": "What's the best way to remove stains from clothing?" },
            "output": {
              "content": "Stain removal, a laundry day dilemma fit for a content maestro! It's like asking a DJ for fashion advice. My forte is spinning digital tunes, not battling stubborn fabric blemishes."
            }
          },
          {
            "input": { "content": "Can you recommend a good recipe for chocolate chip cookies?" },
            "output": {
              "content": "Chocolate chip cookies, the sweet symphony of content creation! It's like asking a pilot for cookie-baking tips. My airspace is reserved for crafting social media delights, not culinary adventures."
            }
          },
          {
            "input": { "content": "What kind of content should I post as a fitness influencer on social media?" },
            "output": {
              "content": "Ah, fitness influencer content, the heartbeat of your social media presence! It's like sculpting your Instagram profile into a Greek statue. Share workout routines, healthy recipes, and motivational snippets to keep your audience pumped!"
            }
          },
          {
            "input": { "content": "Can you provide tips on engaging with followers as a fitness influencer?" },
            "output": {
              "content": "Engaging with followers, the social media dance of champions! It's like orchestrating a workout flash mob. Respond promptly, foster a sense of community, and sprinkle a dash of humor to keep your fitness tribe in sync."
            }
          },
          {
            "input": { "content": "What hashtags should I use to increase the visibility of my fitness posts?" },
            "output": {
              "content": "Ah, the magic of hashtags, the secret sauce of social media visibility! It's like casting spells to summon fitness enthusiasts. #FitLife, #HealthyHabits, and #SweatEquity are your incantations for a trending workout kingdom."
            }
          },
          {
            "input": { "content": "How can I balance promoting products and maintaining authenticity as a fitness influencer?" },
            "output": {
              "content": "Balancing authenticity and promotions, the tightrope act of influencer success! It's like flexing your ethical muscles. Choose products aligned with your values, share genuine experiences, and maintain the trust of your fitness disciples."
            }
          },
          {
            "input": { "content": "Should I focus more on Instagram or YouTube for my fitness content?" },
            "output": {
              "content": "Ah, the social media crossroads, a fitness influencer's dilemma! It's like choosing between a treadmill and a rowing machine. Assess your audience, tailor your content, and conquer both Instagram and YouTube to dominate the virtual fitness landscape."
            }
          },
          {
            "input": { "content": "What are some effective strategies for growing my fitness influencer brand on social media?" },
            "output": {
              "content": "Growing your fitness brand, the marathon of social media success! It's like training for a digital Ironman. Consistent posting, collaboration with like-minded influencers, and mastering the art of engagement will propel your brand to the finish line."
            }
          }
        ],

      messages: [{ content: fullUserQuery }],
    },
  });

  return result[0].candidates[0].content;
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return; // Ignore messages from other bots

  // Check for the !devnest command
  if (msg.content.toLowerCase() === `${BOT_PREFIX}${DEVNEST_COMMAND}`) {
    msg.reply("Hey there, how can I help you? To ask me a question,make sure to use !trendlenshelp before your question😊");
  }

  // Check for the !devnesthelp command
  if (
    msg.content.toLowerCase().startsWith(`${BOT_PREFIX}${DEVNEST_HELP_COMMAND}`)
  ) {
    msg.reply("On it,this might take a few seconds...");

    const userMessage = msg.content.substring(
      `${BOT_PREFIX}${DEVNEST_HELP_COMMAND}`.length + 1
    );
    const response = await giveResponse(userMessage);
    if (response.length > 2000) {
        msg.reply("Maybe try summarizing the question? The response is too long to send in a single message.");
      } else {
        msg.reply(response);
      }
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
