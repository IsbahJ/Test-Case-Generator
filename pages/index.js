import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ animal: animalInput }),
        body: JSON.stringify({ url: urlInput }),
      });

      const data = await response.json();
      
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("data",data)
      setResult(data.result);
      setUrlInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Test Case Generator</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>Trialx Test Case Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <input type="submit" value="Generate Test Cases" style={{marginBottom: "2rem"}} />
        </form>
        {/* <div className={styles.result}>{result}</div> */}
        <div className="text-wrapper">
        {result?.split("\n").map((item,key) => {
            return (
            
            <div className="text" key={key}>{item}</div>)
        })}
        </div>
        
      </main>
    </div>
  );
}


