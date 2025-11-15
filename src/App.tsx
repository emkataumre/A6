import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Person, type PersonProps } from "./components/Person";
import { NavButton } from "./components/NavButton";

let baseUrl: string = "https://api.themoviedb.org/3/search/person";
let apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [people, setPeople] = useState<PersonProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current?.value) {
      const newQuery = inputRef.current.value;
      setQuery(newQuery);
      setPage(page);
    }
  };

  useEffect(() => {
    if (query !== "") {
      fetch(`${baseUrl}?query=${query}&api_key=${apiKey}&page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(
            `${baseUrl}?query=${query}&api_key=${apiKey}&page=${page}`
          );

          console.log(data);
          setPeople(data.results || []);
          setTotalPages(data.total_pages);
        });
    }
  }, [page, query]);

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Search for a name" />

      <button onClick={handleSubmit}>Submit</button>

      {people?.map((person: PersonProps) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          known_for_department={person.known_for_department}
          //profile_path={person.profile_path}
          popularity={person.popularity}
          known_for={person.known_for}
        />
      ))}

      {totalPages > 0 && (
        <>
          <NavButton
            key={1}
            pageNumber={1}
            isCurrent={page === 1}
            onClick={() => setPage(1)}
          />
        </>
      )}

      {Array.from({ length: 5 }, (_, i) => {
        const pageNum = page - 2 + i;
        console.log(page);
        if (pageNum == 1 || pageNum < 1 || pageNum > totalPages) {
          return null;
        }
        return (
          <NavButton
            key={pageNum}
            pageNumber={pageNum}
            isCurrent={pageNum === page}
            onClick={() => setPage(pageNum)}
          />
        );
      })}

      {totalPages > 0 && (
        <>
          <NavButton
            key={totalPages}
            pageNumber={totalPages}
            isCurrent={page === totalPages}
            onClick={() => setPage(totalPages)}
          />
        </>
      )}
    </>
  );
}

export default App;
