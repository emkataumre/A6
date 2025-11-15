import { Link } from "react-router-dom";

export interface MovieSummary {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
}

export interface PersonProps {
  id?: number;
  name?: string;
  known_for_department?: string;
  popularity?: number;
  known_for?: MovieSummary[];
}

export function Person(props: PersonProps) {
  return (
    <>
      <div style={{ backgroundColor: "darkslategrey" }}>
        <h2>{props.name}</h2>
        <p>{props.known_for_department}</p>
        <div style={{ backgroundColor: "gray" }}>
          {props.known_for &&
            props.known_for.map((movie: MovieSummary) => (
              <div style={{ borderBottom: "2px solid black" }} key={movie.id}>
                <h4>{movie.title}</h4>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
