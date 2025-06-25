const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Welcome to MentorConnect!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Welcome to MentorConnect, ${userName}!</h1>
        <p>Thank you for joining our AI-powered mentorship platform.</p>
        <p>You can now:</p>
        <ul>
          <li>Find and connect with expert mentors</li>
          <li>Schedule mentorship sessions</li>
          <li>Use our AI Talk feature for instant guidance</li>
          <li>Build your professional resume</li>
          <li>Track your learning progress</li>
        </ul>
        <p>Get started by exploring our mentor directory and finding your perfect match!</p>
        <a href="${process.env.FRONTEND_URL}/mentors" 
           style="background-color: #3B82F6; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Find Mentors
        </a>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendMeetingReminder = async (userEmail, userName, meetingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Upcoming Mentorship Session Reminder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Meeting Reminder</h1>
        <p>Hi ${userName},</p>
        <p>This is a reminder about your upcoming mentorship session:</p>
        <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>${meetingDetails.title}</h3>
          <p><strong>Date:</strong> ${new Date(meetingDetails.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(meetingDetails.date).toLocaleTimeString()}</p>
          <p><strong>Duration:</strong> ${meetingDetails.duration} minutes</p>
          ${meetingDetails.meetingLink ? 
            `<a href="${meetingDetails.meetingLink}" 
               style="background-color: #10B981; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Join Meeting
            </a>` : ''
          }
        </div>
        <p>We look forward to your session!</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Meeting reminder sent successfully');
  } catch (error) {
    console.error('Error sending meeting reminder:', error);
  }
};

const sendTodoReminder = async (userEmail, userName, todos) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Daily Todo Reminder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Daily Todo Reminder</h1>
        <p>Hi ${userName},</p>
        <p>You have ${todos.length} pending task(s) for today:</p>
        <ul>
          ${todos.map(todo => `<li>${todo.text}</li>`).join('')}
        </ul>
        <p>Stay productive and achieve your goals!</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" 
           style="background-color: #3B82F6; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          View Dashboard
        </a>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Todo reminder sent successfully');
  } catch (error) {
    console.error('Error sending todo reminder:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendMeetingReminder,
  sendTodoReminder
};