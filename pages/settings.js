import { useEffect, useState, useRef } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai"
import { firebaseCloudMessaging } from '../firebase/webPush.js';
import Link from 'next/link';
const axios = require('axios');

export default function Settings({ name, setName, isTokenFound, setTokenFound, regToken, setRegToken}) {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [editOn, setEditOn] = useState(false);

  const nameInput = useRef(null);

  const stopStartNotifications = () => {
    if (notificationsOn){
      console.log("turning notifications off");
      axios.delete('https://us-central1-trans-name-affirmations.cloudfunctions.net/notificationHandler/stopNotification', {
        data: {
          taskId: regToken.split(":")[1]
        }
      })
      .then(response => console.log(response))
      .catch(error => console.error(error))
    } else {
      console.log("turning notifications on");
      axios.post('https://us-central1-trans-name-affirmations.cloudfunctions.net/notificationHandler/onEnterName', {
        registrationToken: regToken,
        name: name,
        url: window.location.protocol + "//" + window.location.hostname
      })
      .then(response => console.log(response))
      .catch(error => console.error(error))
    }
    setNotificationsOn(!notificationsOn)
  }

  const editName = () => {
    console.log("edit");
    setEditOn(true);
  }

  const saveName = (e) => {
    e.preventDefault();

    firebaseCloudMessaging.storeName(nameInput.current.value);
    setEditOn(false);

    console.log("name saved");
  }

  let buttonClasses = notificationsOn ? "bg-red-600 red-drop-shadow-xl" : "bg-sky-300 sky-drop-shadow-xl"

  return (<main className="max-w-xs text-gray-700">
    <Link href="/">
      <a className="w-16 h-16 bg-white rounded-full mb-4 flex justify-center items-center text-3xl white-drop-shadow-xl">
        <FiChevronLeft />
      </a>
    </Link>
    <form className="flex items-center bg-white mb-4 p-8 rounded-3xl">
      <div className="grow flex items-baseline">
        <span className="uppercase text-xs tracking-wide font-bold">Name</span>
        {!editOn && <span className="mx-4">{name}</span>}
        {editOn && <input ref={nameInput} className="appearance-none border rounded-xl w-full p-2 mx-2 leading-tight focus:outline-none focus:shadow-outline" defaultValue={name}/>}
      </div>
      {!editOn && <button className="text-xl text-sky-300" onClick={editName}><AiFillEdit/></button>}
      {editOn && <button className="underline" onClick={saveName}>Save</button>}
    </form>

    <button className={"py-4 w-full rounded-full text-white uppercase font-bold tracking-wider " + buttonClasses}
      type="button"
      onClick={stopStartNotifications}>
      {notificationsOn ? "Stop" : "Resume"} notifications
    </button>
    </main>)
}
