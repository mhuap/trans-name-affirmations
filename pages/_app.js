import { useState, useEffect } from "react";
import { firebaseCloudMessaging, onMessageListener } from '../firebase/webPush.js';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [name, setName] = useState('');
  const [onboarding, setOnboarding] = useState(1);
  const [isTokenFound, setTokenFound] = useState(false);
  const [regToken, setRegToken] = useState(null);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [show, setShow] = useState(false);

  useEffect(() => {
    firebaseCloudMessaging.init(setTokenFound, setRegToken, setName, setOnboarding)

  }, []);

  useEffect(() => {
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
    }).catch(err => console.log('failed: ', err));
  }, [name])

  return <Component {...pageProps}
    name={name}
    setName={setName}
    onboarding={onboarding}
    setOnboarding={setOnboarding}
    isTokenFound={isTokenFound}
    setTokenFound={setTokenFound}
    regToken={regToken}
    setRegToken={setRegToken}
    notification={notification}
    setNotification={setNotification}
    show={show}
    setShow={setShow}
    />
}

export default MyApp
