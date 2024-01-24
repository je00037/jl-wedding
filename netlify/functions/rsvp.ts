import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

async function loadSavedCredentialsIfExist() {
  try {
    // const content = await fs.readFile(TOKEN_PATH);
    // const credentials = JSON.parse(content);
    const creds = {
      type: "authorized_user",
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.REACT_APP_GOOGLE_REFRESH_TOKEN,
    };
    return google.auth.fromJSON(creds);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function postRSVP(auth, rsvp) {
  const values = [
    [rsvp.name1, rsvp.name2, rsvp.name3, rsvp.name4, rsvp.dietary, rsvp.song],
  ];
  const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;
  const range = "RSVP!A2:F100";
  const valueInputOption = "RAW";
  const resource = { values };

  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    return res;
  } catch (e) {
    console.log("error with sheets: ", e);
  }
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const rsvpPayloadStr = event.body;
  const rsvpPayload = JSON.parse(rsvpPayloadStr);
  let result;
  try {
    const auth = await authorize();
    result = await postRSVP(auth, rsvpPayload);
  } catch (e) {
    console.log(e);
    throw new Error("Failed to Auth or Post to DB");
  }

  if (result.status === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify({ successfulRSVP: true }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ successfulRSVP: false }),
    };
  }
};

export { handler };
