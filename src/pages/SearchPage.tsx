import { useState, useRef, useEffect } from "react";
import { NavButton } from "../components/NavButton";
import { type PersonProps, Person } from "../components/Person";
import { usePersonContext } from "../store/PersonContext";
import { useNavigate } from "react-router-dom";

let baseUrl: string = "https://api.themoviedb.org/3/search/person";
let apiKey = import.meta.env.VITE_API_KEY;

export function SearchPage() {
  const [people, setPeople] = useState<PersonProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSelectedPerson } = usePersonContext();
  const navigate = useNavigate();

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
        <div
          style={{ cursor: "pointer" }}
          key={person.id}
          onClick={() => {
            setSelectedPerson(person);
            navigate(`/person/${person.id}`);
          }}
        >
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            known_for_department={person.known_for_department}
            popularity={person.popularity}
            known_for={person.known_for}
          />
        </div>
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
