const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { CloudTasksClient } = require('@google-cloud/tasks');
const express = require('express');
const cors = require('cors');
// const path = require('path');

const aff = require('./affirmations.js');

// const serviceAccount = require("./trans-name-affirmations-firebase-adminsdk-zn"+
// "haw-250b55374a.json");
//
// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post('/onEnterName', async (req, res) => {
  // const sendsIn = "1 minute";
  // const sendsIn = req.body.date;

  const sendsAtSeconds = Date.now() / 1000 + 30;

  const project = 'trans-name-affirmations'
  const location = 'us-central1';
  const queue = 'trans-names-queue';

  const tasksClient = new CloudTasksClient()
  const queuePath = tasksClient.queuePath(project, location, queue)

  const url = `https://${location}-${project}.cloudfunctions.net/notificationHandler/sendNotification`
  // const docPath = snapshot.ref.path
  // const payload: ExpirationTaskPayload = { docPath }

  const payload = {
    name: req.body.name,
    registrationToken: req.body.registrationToken,
    url: req.body.url,
  }

  const task = {
    httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: {
            'Content-Type': 'application/json',
        },
    },
    scheduleTime: {
        seconds: sendsAtSeconds
    }
  }

  try {
    // Send create task request.
    const [ response ] = await tasksClient.createTask({ parent: queuePath, task })
    console.log(`Created task ${response.name}`);
    res.status(200).json({message: "sending in 30s"});
    res.end();
  } catch (error) {
    console.error(Error(error.message));
    res.status(500).json(error);
    res.end();
  }

});

app.post('/sendNotification', async (req, res) => {
  const idx = Math.floor((Math.random() * aff.getLength));
  console.log("idx", idx)
  const a = aff.getArray[idx];
  const msgBody =  "Hey " + req.body.name +  ", " + a;
  const message = {
    notification: {
      title: "Daily affirmation",
      body: msgBody,
    },
    token: req.body.registrationToken,
    webpush: {
      fcm_options: {
        link: req.body.url
      }
    }
  };

  return new Promise((resolve, reject) => {
    admin
     .messaging()
     .send(message) // set of operations
     .then((response) => {
       console.log('Successfully sent message:', response);
       res.status(200).json({
         sent: true,
         message: message,
       })
       res.end();
       resolve();
     })
     .catch((e) => {
       console.error(e)
       res.status(500).json(e)
       res.end();
       resolve();
     })
  })
});

exports.notificationHandler = functions.https.onRequest(app);
