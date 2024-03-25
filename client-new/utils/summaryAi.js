import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY =
  process.env.API_KEY_GOOGLE_AISTUDIO ||
  "AIzaSyDXLgQbRGShwrTTPkk5-iZmxamCkptBUX8";

const summaryAi = async (category, month) => {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log("run nya jalan");
  console.log(API_KEY, "<<<< API key");
  console.log(month);
  console.log(category);

  const prompt = `Give 2 points without number list summary what will we get after ${month} week training ${category}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text.replace(/\*\*/g, '').split(".").join(`. \n`)


  // return (`1. **Improved Ball Handling:** Enhanced coordination, dribbling skills, and control over the ball.
  // 2. **Fundamentals of Shooting:** Understanding of proper form, footwork, and release mechanics.
  // 3. **Basic Defensive Concepts:** Introduction to stance, footwork, and techniques for defending against opponents.`).replace(/\*\*/g, '').split(".").join(`. \n`)
};

export default summaryAi;
