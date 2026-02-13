# 🦷 SmileCare Dental

Dental Clinic Appointment & Follow-Up Automation System

🌐 **Live:** [https://sumanachary99.github.io/dentalClinic/](https://sumanachary99.github.io/dentalClinic/)

## Features

- Multi-step appointment booking
- WhatsApp integration (confirmations, follow-ups)
- Google Sheets as database (localStorage fallback for dev)
- Receptionist dashboard with PIN auth
- Automated reminders & follow-ups via Google Apps Script
- Mobile-first responsive design

## Tech Stack

React · Vite · Google Sheets API · WhatsApp Deep Links · GitHub Pages

## Run Locally

```bash
npm install
npm run dev
```

## Dashboard Access

PIN: `1234`

---

## Google Sheets Setup

The app stores appointments in **Google Sheets**. Without setup, it falls back to browser localStorage.

### Step-by-step:

1. **Create a Google Sheet** in your Google account (e.g. `sumanachary99@gmail.com`)
2. **Add headers** in Row 1 of the `Appointments` tab:

   | A | B | C | D | E | F | G | H | I | J | K |
   |---|---|---|---|---|---|---|---|---|---|---|
   | id | patientName | phoneNumber | appointmentDate | appointmentTime | serviceType | status | followUpStage | lastMessageSent | notes | createdAt |

3. **Open Extensions → Apps Script** and paste the contents of [`automation/google-apps-script/Code.gs`](automation/google-apps-script/Code.gs)
4. **Deploy** → New Deployment → Web App
   - Execute as: **Me**
   - Who has access: **Anyone**
5. **Copy the Web App URL** and create a `.env` file in the project root:
   ```
   VITE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
6. Restart your dev server — appointments will now read/write to your Google Sheet

### Optional: Automated Reminders

In your Apps Script editor, go to **Triggers** and add:
- `sendReminders` → Time-driven → Every hour
- `processFollowUps` → Time-driven → Every hour

This will auto-send WhatsApp reminders 24hr/2hr before appointments and follow-ups on Day 1/3/7 after visits.

## WhatsApp

All WhatsApp messages use `wa.me/919110443004` deep links — they open WhatsApp with a pre-filled message. No API key needed for this.
