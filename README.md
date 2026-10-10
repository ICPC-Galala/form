# GALALA ICPC COMMUNITY — Student Registration

A static branded registration page with a Google Sheets / Google Apps Script starter backend.

## Files
- `index.html` — form markup and fields
- `styles.css` — responsive Galala-inspired visual design and decorative motifs
- `script.js` — client-side validation and submission
- `Code.gs` — Google Apps Script endpoint that appends registrations to a Sheet
- `assets/` — logo and cover artwork

## 1. Set up the response spreadsheet
1. Create a new Google Sheet in the Google account that will own the registrations.
2. Copy the spreadsheet ID from its URL: the long value between `/d/` and `/edit`.
3. Open **Extensions → Apps Script**.
4. Replace the editor contents with `Code.gs` from this package.
5. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID.
6. Save the project.
7. Select **Deploy → New deployment → Web app**.
8. Set **Execute as** to your account. Set access to **Anyone** if your account's policy allows public student submissions.
9. Deploy, authorize the script, and copy the Web app URL ending in `/exec`.

**Privacy/security:** A public web app endpoint can receive spam or fake submissions. Use a dedicated spreadsheet, restrict access to the sheet to organizers, avoid collecting unnecessary sensitive information, and review submissions. For a high-stakes or large-scale intake, add stronger anti-spam/rate-limiting and server-side verification before launch.

## 2. Connect the website
1. Open `script.js`.
2. The deployed `/exec` URL has already been added to `script.js`. If you create a new Apps Script deployment, update the URL there.
3. Save the file.

The browser uses `no-cors`, so it cannot read a confirmed success/failure response from Apps Script. The confirmation shown to the student means the request was sent by the browser, not that a spreadsheet write was independently verified. Before sharing widely, submit a test registration and confirm that a row appears in the Sheet.

## 3. Publish on Netlify
1. Keep `index.html`, `styles.css`, `script.js`, and the `assets` folder together.
2. Sign in at https://app.netlify.com/drop and drag the `galala-icpc-registration` folder (or upload its contents as supported by the current Netlify interface).
3. Open the generated URL and test the form on desktop and mobile.
4. Test one submission and verify it appears in the spreadsheet before sharing the link.

## 4. Export to Excel
Open the response Google Sheet and choose **File → Download → Microsoft Excel (.xlsx)**. Keep the sheet private to authorized organizers; do not publish the response spreadsheet publicly.

## Fields collected
Full Name, University ID, University Email Address, Academic Year, Age, and Mobile Number (WhatsApp).
