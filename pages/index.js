import { useRef, useState, useEffect } from "react";
import { firebaseCloudMessaging, onMessageListener } from '../firebase/webPush.js';
import IndexHead from '../components/indexHead.js';
import NotificationToast from '../components/notificationToast.js';
import Content from '../components/content.js';
import Onboarding from '../components/onboarding.js';
const axios = require('axios');
// import styles from '../styles/Home.module.css'

const Home = () => {
  const [name, setName] = useState('');
  const [onboarding, setOnboarding] = useState(1);

  const [isTokenFound, setTokenFound] = useState(false);
  const [regToken, setRegToken] = useState(null);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    firebaseCloudMessaging.init(setTokenFound, setRegToken, setName, setOnboarding)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        console.log("setting notification");
        const payload = event.data;
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
      });
    }
  }, []);

  useEffect(() => {
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
    }).catch(err => console.log('failed: ', err));
  }, [name])


  const setNameOnboarding = (nameInput) => {
    setOnboarding(2);
    setName(nameInput);
    firebaseCloudMessaging.storeName(nameInput);
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      setOnboarding(0);
      axios.post('https://us-central1-trans-name-affirmations.cloudfunctions.net/notificationHandler/onEnterName', {
        registrationToken: regToken,
        name: name,
        url: window.location.href
      })
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }


  return (
    <>
      <IndexHead />

      <main className="max-w-xs text-gray-700">
        {!isTokenFound && <p className="bg-white p-8 rounded-3xl mb-4"> Need notification permission ❗️ </p>}

        <Onboarding
          stage={onboarding}
          name={name}
          setNameOnboarding={setNameOnboarding}
          handleSubmit={handleSubmit}
        />

        {!onboarding && <Content show={show}/>}

        {show && <NotificationToast title={notification.title} body={notification.body}/>}

      </main>

    </>
  )
}

export default Home;
