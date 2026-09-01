const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Expenses';

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:'Budget API'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Date','Time','Amount','Mode','Category','Description']);
    }
    const now = new Date();
    const date = data.date || Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    sh.appendRow([date, now, Number(data.amount)||0, data.mode||'', data.category||'', data.description||'']);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}