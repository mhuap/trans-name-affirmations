var admin = require("firebase-admin");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// This registration token comes from the client FCM SDKs.
const registrationToken = "fKtKX35w4MGPfZxpWTxN2v:APA91bF0pSyR1HPA4_3nm8vyzxJxSOIlWFgo-k0WtxgRBi5fIucsB7UwjusfvUfAHX7oKoGZKfnlW8wEoCWy0IgJbuSnHHArptRpTMKX3olN5giWpAVLX-5oHtUhCzOVCTCaU25KdBKo";

const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};


export default async function handler(req, res) {

    // Return promise to handle serverless function timeouts
    return new Promise((resolve, reject) => {
       admin
        .getMessaging()
        .send(message) // set of operations
        .then((response) => {
          console.log('Successfully sent message:', response);
          res.status(200)
          res.end()
          resolve()
        })
        .catch((e) => {
          res.status(405).json(e)
          res.end()
          resolve()
        })
    }
,}
