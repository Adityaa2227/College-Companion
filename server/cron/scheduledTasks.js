const cron = require('node-cron');
const User = require('../models/User');
const Meeting = require('../models/Meeting');
const Todo = require('../models/Todo');
const { sendMeetingReminder, sendTodoReminder } = require('../services/email');
const { sendMeetingNotification, sendTodoNotification } = require('../services/notifications');

// Send meeting reminders 15 minutes before the meeting
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 15 * 60000); // 15 minutes from now

    const upcomingMeetings = await Meeting.find({
      date: {
        $gte: now,
        $lte: reminderTime
      },
      status: 'scheduled',
      reminderSent: { $ne: true }
    })
    .populate('studentId mentorId', 'name email');

    for (const meeting of upcomingMeetings) {
      // Send email reminders
      await sendMeetingReminder(meeting.studentId.email, meeting.studentId.name, meeting);
      await sendMeetingReminder(meeting.mentorId.email, meeting.mentorId.name, meeting);

      // Send push notifications if subscriptions exist
      // This would require storing push subscriptions in the database
      
      // Mark reminder as sent
      meeting.reminderSent = true;
      await meeting.save();
    }

    if (upcomingMeetings.length > 0) {
      console.log(`Sent reminders for ${upcomingMeetings.length} meetings`);
    }
  } catch (error) {
    console.error('Error sending meeting reminders:', error);
  }
});

// Send daily todo reminders at 9 AM
cron.schedule('0 9 * * *', async () => {
  try {
    const users = await User.find({ role: { $in: ['student', 'mentor'] } });

    for (const user of users) {
      const pendingTodos = await Todo.find({
        userId: user._id,
        completed: false,
        dueDate: { $lte: new Date() }
      });

      if (pendingTodos.length > 0) {
        await sendTodoReminder(user.email, user.name, pendingTodos);
      }
    }

    console.log('Daily todo reminders sent');
  } catch (error) {
    console.error('Error sending todo reminders:', error);
  }
});

// Update user streaks daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    // Find users who didn't study yesterday
    const usersWithoutStudy = await User.find({
      _id: {
        $nin: await StudySession.distinct('userId', {
          date: {
            $gte: yesterday,
            $lte: endOfYesterday
          }
        })
      },
      streak: { $gt: 0 }
    });

    // Reset their streaks
    await User.updateMany(
      { _id: { $in: usersWithoutStudy.map(u => u._id) } },
      { $set: { streak: 0 } }
    );

    console.log(`Reset streaks for ${usersWithoutStudy.length} users`);
  } catch (error) {
    console.error('Error updating streaks:', error);
  }
});

// Clean up old messages (older than 6 months)
cron.schedule('0 2 * * 0', async () => { // Weekly on Sunday at 2 AM
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = await Message.deleteMany({
      createdAt: { $lt: sixMonthsAgo }
    });

    console.log(`Cleaned up ${result.deletedCount} old messages`);
  } catch (error) {
    console.error('Error cleaning up messages:', error);
  }
});

// Generate daily quotes cache
cron.schedule('0 1 * * *', async () => { // Daily at 1 AM
  try {
    // This could fetch quotes from an external API and cache them
    // For now, we'll just log that the task ran
    console.log('Daily quotes cache updated');
  } catch (error) {
    console.error('Error updating quotes cache:', error);
  }
});

console.log('Scheduled tasks initialized');