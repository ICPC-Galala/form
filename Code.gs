/**
 * GALALA ICPC COMMUNITY
 * Student Registration Backend
 */

const SPREADSHEET_ID = "1Id_trVHrvOrKsDKyeBJfuNoLJz2bM2ETXn6w_J3LJs0";
const SHEET_NAME = "Registrations";

const HEADERS = [
  "Timestamp",
  "Full Name",
  "University ID",
  "University Email Address",
  "Academic Year",
  "Age",
  "Mobile Number (WhatsApp)"
];

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    const fullName = clean_(p.fullName);
    const universityId = clean_(p.universityId);
    const email = clean_(p.universityEmail).toLowerCase();
    const academicYear = clean_(p.academicYear);
    const age = clean_(p.age);
    const mobile = clean_(p.mobile);

    if (!fullName || !universityId || !email || !academicYear || !age || !mobile) {
      throw new Error("Please complete all required fields.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid university email address.");
    }

    const ageNumber = Number(age);
    if (!Number.isInteger(ageNumber) || ageNumber < 17 || ageNumber > 80) {
      throw new Error("Please enter a valid age.");
    }

    const normalizedMobile = mobile.replace(/[\s()-]/g, "");
    if (!/^\+?[0-9]{8,15}$/.test(normalizedMobile)) {
      throw new Error("Please enter a valid mobile number with country code.");
    }

    const allowedYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Other"];
    if (!allowedYears.includes(academicYear)) {
      throw new Error("Please select a valid academic year.");
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setBackground("#102B63")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
      sheet.autoResizeColumns(1, HEADERS.length);
    }

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 3).setNumberFormat("@");
    sheet.getRange(nextRow, 7).setNumberFormat("@");
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      new Date(), fullName, universityId, email, academicYear, ageNumber, normalizedMobile
    ]]);

    return jsonResponse_({ ok: true, message: "Registration submitted successfully." });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

function clean_(value) {
  return String(value || "").trim().replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 500);
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setBackground("#102B63")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold");
    sheet.autoResizeColumns(1, HEADERS.length);
  }
}
