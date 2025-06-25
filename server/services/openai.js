const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIResponse = async (message, conversationHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are an AI mentor assistant for MentorConnect, a mentorship platform. 
        You help students and professionals with career guidance, study advice, skill development, 
        and professional growth. Be helpful, encouraging, and provide actionable advice. 
        Keep responses concise but informative.`
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate AI response');
  }
};

const moderateContent = async (content) => {
  try {
    const moderation = await openai.moderations.create({
      input: content,
    });

    return {
      flagged: moderation.results[0].flagged,
      categories: moderation.results[0].categories
    };
  } catch (error) {
    console.error('Content moderation error:', error);
    return { flagged: false, categories: {} };
  }
};

module.exports = { generateAIResponse, moderateContent };