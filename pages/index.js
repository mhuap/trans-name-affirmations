import { useRef, useState, useEffect } from "react";
import { getToken2, onMessageListener, send } from '../firebase/webPush.js';
import IndexHead from '../components/indexHead.js'
// import styles from '../styles/Home.module.css'

const Home = () => {
  const [name, setName] = useState(null)
  const nameInput = useRef(null);

  const [isTokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(true);
  const [sendNoti, setSendNoti] = useState(() => null)

  useEffect(() => {
    // firebaseCloudMessaging.init(setTokenFound)
    getToken2(setTokenFound)
    onMessageListener().then(payload => {
      console.log("PAYLOAD");
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));
    setSendNoti(send);
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();

      setName(nameInput.current.value)
  }


  const message = <>
    You will now receive daily affirmations with the name
    <span className="font-bold">{' ' + name}</span>
    .
    </>



  return (
    <div>
      <IndexHead />

      <main className="container mx-auto mt-24">
        <form onSubmit={handleSubmit} className="mb-4 max-w-xs">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Enter your name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            ref={nameInput}
          />
        </form>

        <p className="text-gray-700">
          {name && message}
        </p>

        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}

        {show && <>
          <h1>{notification.title}</h1>
          <p>{notification.body}</p>
          </>}

        <button onClick={sendNoti}></button>
      </main>



    </div>
  )
}

export default Home;
