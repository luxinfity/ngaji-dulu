// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

// Check for POST request, since telegram will only sent a post req
// so no other source will be handled
// https://core.telegram.org/bots/api#recent-changes
export const webHook = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Please send a POST request");
        return;
    }
    functions.logger.info(
        "Hello logs!", { structuredData: true, update: request.body }
    );
    response.send("WebHook accepted!");
});
