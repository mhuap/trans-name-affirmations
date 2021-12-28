import { useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home() {
  const [name, setName] = useState(null)
  const nameInput = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      console.log(nameInput.current.value)
      setName(nameInput.current.value)
  }

  const message = <>
    You will now receive daily affirmations with the name
    <span className="font-bold">{' ' + name}</span>
    .
    </>

  return (
    <div>
      <Head>
        <title>Trans name affirmations</title>
        <meta name="description" content="Generate trans name affirmations" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>

      <main className="container mx-auto mt-24">
        <form onSubmit={handleSubmit} className="mb-4 max-w-xs">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="name"
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
          {name ? message : null}
        </p>
      </main>
    </div>
  )
}
