import "./App.css";
import { useEffect, useState } from "react";
import type { PersonProps } from "./components/Person";

let baseUrl: string = "https://api.themoviedb.org/3/search/person";
let query: string = "hanks";
let apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [person, setPerson] = useState<PersonProps>({});
  useEffect(() => {
    fetch(`${baseUrl}?query=${query}&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setPerson(data));
  }, []);

  console.log(`${baseUrl}?query=${query}&api_key=${apiKey}`);
  console.log(person);

  return <></>;
}

export default App;
