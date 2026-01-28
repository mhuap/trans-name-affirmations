import { AiFillSetting } from "react-icons/ai";
import NotificationToast from './notificationToast.js';
import Link from 'next/link';
const axios = require('axios');


export default function Content({ show, regToken, name }) {

  const sendNotiNow = () => {
    axios.post('https://us-central1-trans-name-affirmations.cloudfunctions.net/notificationHandler/onEnterName', {
      registrationToken: regToken,
      name: name,
      url: window.location.href
    })
    .then(response => console.log(response))
    .catch(error => console.error(error))
  }

  return (<>
      <Link href="/settings">
        <a className="w-16 h-16 bg-white rounded-full mb-4 flex justify-center items-center text-3xl text-sky-300 white-drop-shadow-xl">
          <AiFillSetting />
        </a>
      </Link>

      <button className="p-2 bg-blue-100" onClick={sendNotiNow}>New Noti</button>

      {!show && <p className="uppercase text-xs tracking-wide font-bold opacity-30">Wait for your next affirmation notification</p>}
    </>)
}
