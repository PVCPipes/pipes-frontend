import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Papa from 'papaparse';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [file, setFile] = useState('');
  // const inputRef = useRef();

  const submitFiles = async (e: any) => {
    try {
      const body = { file };
      const res = await fetch(`${process.env.FE_API}/api/hello`, {
        method: 'POST',
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify(body)
      })

      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event: any) => {
    const something = event.target.files[0]

    const blob = new Blob([something], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

    const img = URL.createObjectURL(blob);
    
    setFile(img);
  }


  return (
    <div>
      <label htmlFor="submitFile">Submit your damn file</label>
      

      <input
        onChange={handleChange}
        type="file"
        id="submitFile" name="submitFile"
        accept=".xlsx, .csv" />

      <button onClick={submitFiles}>
        Submit
      </button>
    </div>
  )
}
export default Home
