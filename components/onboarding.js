import { useRef, useState } from "react";

export default function Onboarding({ stage, name, setNameOnboarding, handleSubmit }) {
  const nameInput = useRef(null);
  const [nameValidationMsg, setNameValidationMsg] = useState('');

  const handleNameOnboarding = () => {
    if (nameInput.current.value){
      setNameOnboarding(nameInput.current.value)
    } else {
      setNameValidationMsg('Please enter your name')
    }
  }

  const nameOnboarding = <>
    <div className="bg-white p-8 rounded-3xl">
      <label className="block uppercase text-xs tracking-wide font-bold"
        htmlFor="name"
      >
       Enter your name
      </label>
      <input
        className="appearance-none border rounded-xl w-full py-4 px-4 my-2 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        ref={nameInput}
      />
      {nameValidationMsg && <small className='text-red-600'>{nameValidationMsg}<br/></small>}
      <small>You can change this later. Use whatever name feels most comfortable.</small>
    </div>

    <button type="submit" disabled></button>

    <button className="bg-pink-300 py-4 w-full rounded-full mt-4 text-white uppercase font-bold tracking-wider pink-drop-shadow-xl"
      type="button"
      onClick={handleNameOnboarding}>
      Continue
    </button>
    </>

  const finishOnboarding = <>
  <div className="bg-white p-8 rounded-3xl text-xs">
    <p className="block uppercase tracking-wide font-bold mb-2">
      You're all set, {name}
    </p>

    <p>You will receive daily notifications with pleasant hand-made affirmations.</p>
  </div>

  <button className="bg-pink-300 py-4 w-full rounded-full mt-4 text-white uppercase font-bold tracking-wider pink-drop-shadow-xl"
    type="submit"
  >
    Finish
  </button>
  </>

  if (stage) {
    return <form onSubmit={handleSubmit}>
      {stage == 1 && nameOnboarding}
      {stage == 2 && finishOnboarding}
    </form>
  } else {
    return null
  }
}
