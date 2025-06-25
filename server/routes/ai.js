const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { generateAIResponse, moderateContent } = require('../services/openai');

// AI Chat endpoint
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // Moderate content first
    const moderation = await moderateContent(message);
    if (moderation.flagged) {
      return res.status(400).json({ 
        message: 'Message contains inappropriate content',
        categories: moderation.categories 
      });
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(message, conversationHistory);

    res.json({
      response: aiResponse,
      timestamp: new Date(),
      conversationId: req.user.userId
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ message: 'Failed to generate AI response' });
  }
});

// AI Mentor Matching
router.post('/match-mentors', authenticateToken, async (req, res) => {
  try {
    const { interests, goals, experience, preferredStyle } = req.body;
    const userId = req.user.userId;

    // This would use AI to match mentors based on user preferences
    // For now, we'll return a mock response
    const matchingPrompt = `
      Find the best mentors for a student with these characteristics:
      - Interests: ${interests.join(', ')}
      - Goals: ${goals}
      - Experience Level: ${experience}
      - Preferred Mentoring Style: ${preferredStyle}
      
      Provide a brief explanation of why these mentors would be a good match.
    `;

    const aiResponse = await generateAIResponse(matchingPrompt);

    res.json({
      recommendations: aiResponse,
      matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Matching Error:', error);
    res.status(500).json({ message: 'Failed to generate mentor recommendations' });
  }
});

// AI Resume Review
router.post('/review-resume', authenticateToken, async (req, res) => {
  try {
    const { resumeData } = req.body;

    const reviewPrompt = `
      Please review this resume and provide constructive feedback:
      
      Name: ${resumeData.personalInfo.name}
      Summary: ${resumeData.summary}
      Experience: ${JSON.stringify(resumeData.experience)}
      Education: ${JSON.stringify(resumeData.education)}
      Skills: ${resumeData.skills.join(', ')}
      
      Provide specific suggestions for improvement, highlight strengths, 
      and suggest any missing sections or information.
    `;

    const aiResponse = await generateAIResponse(reviewPrompt);

    res.json({
      feedback: aiResponse,
      score: Math.floor(Math.random() * 30) + 70, // 70-100%
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Resume Review Error:', error);
    res.status(500).json({ message: 'Failed to review resume' });
  }
});

// AI Career Guidance
router.post('/career-guidance', authenticateToken, async (req, res) => {
  try {
    const { currentRole, targetRole, skills, timeline } = req.body;

    const guidancePrompt = `
      Provide career guidance for someone transitioning from ${currentRole} to ${targetRole}.
      Current skills: ${skills.join(', ')}
      Timeline: ${timeline}
      
      Include specific steps, skill recommendations, and potential challenges to consider.
    `;

    const aiResponse = await generateAIResponse(guidancePrompt);

    res.json({
      guidance: aiResponse,
      actionItems: [
        'Update your resume with relevant skills',
        'Build a portfolio showcasing your work',
        'Network with professionals in your target field',
        'Consider additional certifications or training'
      ],
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Career Guidance Error:', error);
    res.status(500).json({ message: 'Failed to generate career guidance' });
  }
});

module.exports = router;