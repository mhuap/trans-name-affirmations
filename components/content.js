import { AiFillSetting } from "react-icons/ai";
import NotificationToast from './notificationToast.js';
import Link from 'next/link';


export default function Content({ show }) {
  return (<>
      <Link href="/settings">
        <a className="w-16 h-16 bg-white rounded-full mb-4 flex justify-center items-center text-3xl text-sky-300 white-drop-shadow-xl">
          <AiFillSetting />
        </a>
      </Link>

      {!show && <p className="uppercase text-xs tracking-wide font-bold opacity-30">Wait for your next affirmation notification</p>}
    </>)
}
