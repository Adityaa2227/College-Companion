const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/auth/google/callback'
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createCalendarEvent = async (accessToken, eventDetails) => {
  try {
    oauth2Client.setCredentials({ access_token: accessToken });

    const event = {
      summary: eventDetails.title,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'America/Los_Angeles',
      },
      attendees: eventDetails.attendees || [],
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });

    return {
      eventId: response.data.id,
      meetingLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
      htmlLink: response.data.htmlLink
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error('Failed to create calendar event');
  }
};

const updateCalendarEvent = async (accessToken, eventId, updates) => {
  try {
    oauth2Client.setCredentials({ access_token: accessToken });

    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: updates
    });

    return response.data;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    throw new Error('Failed to update calendar event');
  }
};

const deleteCalendarEvent = async (accessToken, eventId) => {
  try {
    oauth2Client.setCredentials({ access_token: accessToken });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId
    });

    return true;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw new Error('Failed to delete calendar event');
  }
};

module.exports = {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent
};