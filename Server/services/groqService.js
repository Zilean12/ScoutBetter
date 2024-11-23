const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your-api-key-here",
});

exports.analyzeResume = async (prompt, role) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${prompt} [End of Resume]. Now, analyze the resume content for ${role} and give scores on Skillsets, Role Fitment, Projects, and give the whole response in a structured way without any extra text.`,
      },
    ],
    model: "llama3-8b-8192",
  });

  const content = chatCompletion.choices[0]?.message?.content || "No response received.";
  return content;
};
