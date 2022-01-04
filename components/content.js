import { AiFillSetting } from "react-icons/ai";
import NotificationToast from './notificationToast.js';


export default function Content({ show }) {
  return (<>
      <a className="w-16 h-16 bg-white rounded-full mb-4 flex justify-center items-center text-3xl text-sky-300 white-drop-shadow-xl"
        type="button"
        href="/settings">
        <AiFillSetting />
      </a>

      {!show && <p className="uppercase text-xs tracking-wide font-bold opacity-30">Wait for your next affirmation notification</p>}
    </>)
}
