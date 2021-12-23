import type { NextPage } from 'next'
import { useState, useRef } from 'react'
import Papa from 'papaparse';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [file, setFile] = useState(null);
  // const inputRef = useRef();

  const submitFiles = (event: any) => {
    console.log("something");
  }

  const handleChange = (event: any) => {
    const something = event.target.files[0]

    const blob = new Blob([something], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

    console.log(blob);
    
    
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
