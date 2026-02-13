// WhatsApp message templates — editable, configuration-driven
export const MESSAGE_TEMPLATES = {
  BOOKING_CONFIRM: {
    id: 'BOOKING_CONFIRM',
    label: 'Booking Confirmation',
    template: `Hi {name}! 😊

Your appointment at {clinic} is confirmed! ✅

📅 Date: {date}
⏰ Time: {time}
🦷 Service: {service}

📍 Address: {address}

Please arrive 10 minutes early. For any changes, call us at {phone}.

Thank you for choosing {clinic}! 🙏`,
  },

  REMINDER_24HR: {
    id: 'REMINDER_24HR',
    label: '24-Hour Reminder',
    template: `Hi {name}! 👋

This is a friendly reminder about your appointment tomorrow:

📅 Date: {date}
⏰ Time: {time}
🦷 Service: {service}

📍 {clinic}, {address}

See you tomorrow! 😊`,
  },

  REMINDER_2HR: {
    id: 'REMINDER_2HR',
    label: '2-Hour Reminder',
    template: `Hi {name}! ⏰

Your appointment at {clinic} is in 2 hours ({time}).

🦷 Service: {service}

We're looking forward to seeing you! 😊`,
  },

  FOLLOWUP_DAY1: {
    id: 'FOLLOWUP_DAY1',
    label: 'Day-1 Follow-up',
    template: `Hi {name}! 😊

Hope your {service} went well yesterday!

Here are some care tips:
✅ Avoid very hot or cold food for 24 hours
✅ Take prescribed medicines on time
✅ Avoid chewing on the treated side
✅ Rinse with lukewarm salt water

If you have any concerns, call us at {phone}. We're here for you! 🙏`,
  },

  FOLLOWUP_DAY3: {
    id: 'FOLLOWUP_DAY3',
    label: 'Day-3 Follow-up',
    template: `Hi {name}! 👋

It's been 3 days since your {service} at {clinic}.

How are you feeling? Any discomfort or concerns?

If yes, please reply or call us at {phone}. We're happy to help! 😊`,
  },

  FOLLOWUP_DAY7: {
    id: 'FOLLOWUP_DAY7',
    label: 'Day-7 Follow-up',
    template: `Hi {name}! 🌟

It's been a week since your {service}!

We'd love to hear about your experience. Your feedback helps us serve you better:
⭐ How was the treatment?
⭐ How was the staff?
⭐ Would you recommend us?

Thank you for choosing {clinic}! 🙏`,
  },

  NOSHOW_RESCHEDULE: {
    id: 'NOSHOW_RESCHEDULE',
    label: 'No-Show Reschedule',
    template: `Hi {name}! 👋

We missed you at your appointment today for {service}.

We understand things come up! Would you like to reschedule?

📞 Call us at {phone}
💬 Or reply to this message

We hope to see you soon! 😊`,
  },
};

/**
 * Fill a message template with actual data
 */
export function fillTemplate(templateId, data) {
  const tmpl = MESSAGE_TEMPLATES[templateId];
  if (!tmpl) return '';

  let message = tmpl.template;
  Object.entries(data).forEach(([key, value]) => {
    message = message.replaceAll(`{${key}}`, value);
  });
  return message;
}
