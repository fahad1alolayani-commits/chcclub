interface JoinRequest {
  id: string;
  fullName: string;
  studentId: string;
  phone: string;
  level: string;
  department: string;
  committee: string;
  createdAt?: any;
  synced?: boolean;
}

/**
 * Searches the user's Drive for an existing spreadsheet with our custom name.
 * If not found, creates a new Spreadsheet with standard headers.
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<string> {
  const SPREADSHEET_NAME = "طلبات انضمام نادي صحة المجتمع";

  try {
    // 1. Search for existing spreadsheet
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
      SPREADSHEET_NAME
    )}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Failed to search Drive: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    if (searchData.files && searchData.files.length > 0) {
      // Return the first matching spreadsheet ID
      return searchData.files[0].id;
    }

    // 2. Create a new Spreadsheet if not found
    const createUrl = "https://sheets.googleapis.com/v4/spreadsheets";
    const createResponse = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          title: SPREADSHEET_NAME,
        },
        sheets: [
          {
            properties: {
              title: "طلبات الانضمام",
              gridProperties: {
                frozenRowCount: 1, // Freeze header row
              },
            },
          },
        ],
      }),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create spreadsheet: ${createResponse.statusText}`);
    }

    const newSpreadsheet = await createResponse.json();
    const spreadsheetId = newSpreadsheet.spreadsheetId;

    // 3. Write Header Row immediately
    const headers = [
      ["تاريخ التقديم", "الاسم كامل", "الرقم الجامعي", "رقم الجوال", "المستوى الدراسي", "التخصص", "اللجنة المطلوبة"]
    ];

    await appendRowsToSheet(accessToken, spreadsheetId, "طلبات الانضمام!A1", headers);

    return spreadsheetId;
  } catch (error) {
    console.error("Error in getOrCreateSpreadsheet:", error);
    throw error;
  }
}

/**
 * Appends data rows to the Google Sheet.
 */
export async function appendRowsToSheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range,
      majorDimension: "ROWS",
      values,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to append rows: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Formats a single JoinRequest object into a spreadsheet row.
 */
export function formatRequestToRow(req: JoinRequest, committeesMap: Record<string, string>): string[] {
  const dateStr = req.createdAt && typeof req.createdAt.toDate === "function"
    ? req.createdAt.toDate().toLocaleString("ar-SA")
    : new Date().toLocaleString("ar-SA");

  let deptName = req.department;
  if (deptName === "clinical_nutrition") deptName = "التغذية السريرية";
  else if (deptName === "health_education") deptName = "التثقيف الصحي";
  else if (deptName === "other") deptName = "أخرى";

  const committeeLabel = committeesMap[req.committee] || req.committee;

  return [
    dateStr,
    req.fullName || "",
    req.studentId || "",
    req.phone || "",
    req.level || "",
    deptName,
    committeeLabel
  ];
}
