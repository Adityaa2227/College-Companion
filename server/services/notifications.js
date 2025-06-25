const webpush = require('web-push');

// Configure web push
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPushNotification = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    console.log('Push notification sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

const sendMeetingNotification = async (userSubscription, meetingDetails) => {
  const payload = {
    title: 'Upcoming Meeting',
    body: `Your meeting "${meetingDetails.title}" starts in 15 minutes`,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: {
      url: '/meetings',
      meetingId: meetingDetails.id
    }
  };

  await sendPushNotification(userSubscription, payload);
};

const sendMessageNotification = async (userSubscription, messageDetails) => {
  const payload = {
    title: 'New Message',
    body: `${messageDetails.senderName}: ${messageDetails.content}`,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: {
      url: '/messages',
      chatId: messageDetails.chatId
    }
  };

  await sendPushNotification(userSubscription, payload);
};

const sendTodoNotification = async (userSubscription, todoDetails) => {
  const payload = {
    title: 'Todo Reminder',
    body: `Don't forget: ${todoDetails.text}`,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: {
      url: '/dashboard',
      todoId: todoDetails.id
    }
  };

  await sendPushNotification(userSubscription, payload);
};

module.exports = {
  sendPushNotification,
  sendMeetingNotification,
  sendMessageNotification,
  sendTodoNotification
};