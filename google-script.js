function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Get the current date and time
    const timestamp = new Date();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.subject,
      data.message
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    // Return error response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Add doGet function to handle preflight requests
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'GET request received'
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*')
  .setHeader('Access-Control-Allow-Methods', 'GET, POST')
  .setHeader('Access-Control-Allow-Headers', 'Content-Type');
} 