/**
 * Google Apps Script — paste this into script.google.com
 *
 * SETUP STEPS:
 * 1. Open https://sheets.google.com and create a new spreadsheet.
 *    Name the first sheet "Registrations".
 *    Add these headers in row 1:
 *      A: Timestamp  B: Full Name  C: Work Email  D: Company  E: Role  F: Interest  G: Challenge
 *
 * 2. Open Extensions > Apps Script in that spreadsheet.
 *    Delete any existing code and paste the entire contents of this file.
 *
 * 3. Click Deploy > New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy, then copy the Web App URL.
 *
 * 4. In index.html, replace YOUR_APPS_SCRIPT_URL_HERE with that URL.
 *
 * 5. Commit and push index.html — Vercel will auto-deploy.
 */

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registrations') || ss.getActiveSheet();

    const p = e.parameter;

    sheet.appendRow([
      p.timestamp || new Date().toISOString(),
      p.name      || '',
      p.email     || '',
      p.company   || '',
      p.role      || '',
      p.interest  || '',
      p.challenge || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allows a quick browser check that the script is live
function doGet() {
  return ContentService.createTextOutput('Trusted AI — registration endpoint is live.');
}
