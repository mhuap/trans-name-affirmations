import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai"
import { firebaseCloudMessaging } from '../firebase/webPush.js';

export default function Settings() {
  const [name, setName] = useState('');

  const cancelNotifications = () => {
    console.log("cancel");
  }

  const editName = () => {
    console.log("edit");
  }

  useEffect(() => {
    firebaseCloudMessaging.getName(setName);
  }, []);

  return (<main className="max-w-xs text-gray-700">
    <a className="w-16 h-16 bg-white rounded-full mb-4 flex justify-center items-center text-3xl white-drop-shadow-xl"
      type="button"
      href="/">
      <FiChevronLeft />
    </a>
    <div className="flex items-center bg-white mb-4 p-8 rounded-3xl">
      <div className="grow">
        <span className="mr-4 uppercase text-xs tracking-wide font-bold">Name</span>
        <span>{name}</span>
      </div>
      <button className="text-xl text-sky-300" onClick={editName}><AiFillEdit/></button>
    </div>

    <button className="bg-red-600 py-4 w-full rounded-full text-white uppercase font-bold tracking-wider pink-drop-shadow-xl"
      type="button"
      onClick={cancelNotifications}>
      Stop notifications
    </button>
    </main>)
}
