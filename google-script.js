function doPost(e) {
  try {
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Get form data
    const formData = e.parameter;
    
    // Get the current date and time
    const timestamp = new Date();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      formData.name,
      formData.email,
      formData.subject,
      formData.message
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return HtmlService.createHtmlOutput('<script>window.top.location.href="' + e.parameter.successUrl + '";</script>');
    
  } catch (error) {
    // Return error response
    return HtmlService.createHtmlOutput('<script>window.top.location.href="' + e.parameter.errorUrl + '";</script>');
  }
}

// Add doGet function to handle preflight requests
function doGet(e) {
  return HtmlService.createHtmlOutput('GET request received');
} 