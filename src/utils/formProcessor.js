// src/utils/formProcessor.js

/**
 * Process the form data and generate insights based on the responses
 * @param {Object} formData - Contains the user's responses to questions
 * @returns {Array} - Array of insight objects with message and status
 */
export function processFormData(formData) {
    const insights = [];
    
    // Process sleep data
    if (formData.sleep === 'good') {
      insights.push({
        message: "Your child's sleep quality has been improving since the past week keep going!",
        status: 'good'
      });
    } else if (formData.sleep === 'average') {
      insights.push({
        message: "Your child's sleep seems adequate but could be improved. Consider establishing a consistent bedtime routine.",
        status: 'neutral'
      });
    } else if (formData.sleep === 'bad') {
      insights.push({
        message: "Your child appears to be having trouble sleeping. This could affect their overall well-being.",
        status: 'bad'
      });
    }
    
    // Process appetite data
    if (formData.appetite === 'good') {
      insights.push({
        message: "Your child's appetite is healthy. Keep offering a variety of nutritious foods.",
        status: 'good'
      });
    } else if (formData.appetite === 'average') {
      insights.push({
        message: "Your child's appetite has been fluctuating. This is normal but monitor for consistent patterns.",
        status: 'neutral'
      });
    } else if (formData.appetite === 'bad') {
      insights.push({
        message: "Your child's apetite has gone bad recently, do you need advice? talk to our chatbot",
        status: 'bad'
      });
    }
    
    // Process mood data
    if (formData.mood === 'good') {
      insights.push({
        message: "Your child's mood has been positive. Continue supporting their emotional well-being.",
        status: 'good'
      });
    } else if (formData.mood === 'average') {
      insights.push({
        message: "Your child's mood has been typical. Be mindful of any changes in behavior or emotional expressions.",
        status: 'neutral'
      });
    } else if (formData.mood === 'bad') {
      insights.push({
        message: "Your child seems to be having mood difficulties. Consider connecting with our mental health resources.",
        status: 'warning'
      });
    }
    
    return insights;
  }