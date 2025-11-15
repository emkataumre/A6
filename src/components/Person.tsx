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
  //: string | null;
  popularity?: number;
  known_for?: MovieSummary[];
}

export function Person(props: PersonProps) {
  return (
    <>
      <div>
        <p>{props.name}</p>
        {/* <p>{props.known_for_department}</p>
        {props.known_for &&
          props.known_for.map((movie: MovieSummary) => (
            <div key={movie.id}>
              <p>{movie.title}</p>
            </div>
          ))} */}
      </div>
    </>
  );
}
