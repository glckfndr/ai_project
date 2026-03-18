import { checkEnvironment } from "./utils.js";
import OpenAI from "openai";

// Initialize the OpenAI client using environment variables
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

checkEnvironment();

/**
 * Challenge: Follow-Up Gift-Genie Conversation
 *
 * The model has no memory!
 * We simulate a conversation history by rebuilding
 * state manually.
 *
 * 1. Store the AI model's first response in the messages array
 * 2. Add a second user message asking for the suggestions to be
      more budget friendly and under $40.
 * 3. Send a chat completions request with the messages array again
 * 4. Log the final response's content
 *
 * 💡 Check the hints folder for more guidance!
 */
const messages = [
  {
    role: "system",
    content: `Make these suggestions thoughtful and practical.
    Your response must be under 100 words.
    Skip intros and conclusions.
    Only output gift suggestions.`,
  },
  {
    role: "user",
    content: `Suggest some gifts for someone who loves hiphop music.`,
  },
];

const firstResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
});

// Extract the model's generated text from the response
console.log(firstResponse.choices[0].message.content);

const firstAssistantMessage = firstResponse.choices[0].message;
messages.push(firstAssistantMessage);

messages.push({
  role: "user",
  content: "More budget friendly. Less than $40.",
});

// Send second chat completions request with extended messages array
const secondResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
});

console.log("Budget friendly suggestions:");
console.log(secondResponse.choices[0].message.content);

// - Noise-cancelling wireless over-ear headphones - A beginner-friendly vinyl turntable with starter records - Curated hip-hop vinyl box set - Tickets to a hip-hop concert or festival - Portable Bluetooth speaker - USB condenser microphone for home recording - Beat-making starter kit with MIDI controller - Hip-hop lyric/history book - Artist-themed hoodie or cap - Vinyl record cleaning kit

// Budget friendly suggestions:
// - Colored 7" hip-hop vinyl singles - Vinyl cleaning kit (carbon fiber brush) - Pack of inner/outer record sleeves - Hip-hop lyric/history pocket book - Hip-hop enamel pins or patches set - Poster or mini print of iconic album art - Hip-hop-themed tee or socks - Portable Bluetooth speaker - Cassette mixtapes from indie artists - USB microphone pop filter and mic stand clamp
