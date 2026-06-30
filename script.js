// Save results from test page
function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents).data;

        sheet.appendRow([
            data.name,
            data.department,
            data.score,
            data.percentage,
            data.date,
            data.answers
        ]);

        return createResponse({ status: "success" });
    } catch (err) {
        return createResponse({ status: "error", message: err.message });
    }
}

// Load results for admin page
function doGet(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const allData = sheet.getDataRange().getValues();
        return createResponse(allData);
    } catch (err) {
        return createResponse({ status: "error", message: err.message });
    }
}

// Handle browser preflight checks
function doOptions(e) {
    return createResponse({});
}

// Safe, working response builder
function createResponse(data) {
    const json = JSON.stringify(data);
    return ContentService.createTextOutput(json)
        .setMimeType(ContentService.MimeType.JSON);
}