import { useRef, useState, useEffect } from "react";
import { firebaseCloudMessaging, onMessageListener } from '../firebase/webPush.js';
import IndexHead from '../components/indexHead.js';
import NotificationToast from '../components/notificationToast.js';
const axios = require('axios');
// import styles from '../styles/Home.module.css'

const Home = () => {
  const [name, setName] = useState('')
  const nameInput = useRef(null);

  const [isTokenFound, setTokenFound] = useState(false);
  const [regToken, setRegToken] = useState(null);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    firebaseCloudMessaging.init(setTokenFound, setRegToken, setName)
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

  const handleSubmit = (e) => {
      e.preventDefault();

      setShow(false);
      setName(nameInput.current.value);
      firebaseCloudMessaging.storeName(nameInput.current.value);
      axios.post('https://us-central1-trans-name-affirmations.cloudfunctions.net/notificationHandler/onEnterName', {
        registrationToken: regToken,
        name: nameInput.current.value,
        url: window.location.href
      })
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }

  const message = <>
    You will receive daily affirmations with the name
    <span className="font-bold">{' ' + name}</span>
    .
    </>

  return (
    <div>
      <IndexHead />



      <main className="container mx-auto mt-24">
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}

        <div className="bg-white my-4 max-w-xs p-8 rounded-3xl">
          <p className="text-gray-700 mb-4">
            {name && message}
          </p>
          <form onSubmit={handleSubmit}>
            <label className="block uppercase text-xs tracking-wide text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              {name ? 'Change' : 'Enter'} your name
            </label>
            <input
              className="appearance-none border rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              ref={nameInput}
              required
            />
            <button type="submit" className="bg-pink-300 py-4 w-full rounded-full mt-4 text-white uppercase font-bold tracking-wider pink-drop-shadow-xl">
              Submit
            </button>
          </form>
        </div>

        {show && <NotificationToast title={notification.title} body={notification.body}/>}

      </main>



    </div>
  )
}

export default Home;
