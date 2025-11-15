import { useParams } from "react-router-dom";
import { usePersonContext } from "../store/PersonContext";
import { useEffect, useState } from "react";
import type { PersonProps } from "../components/Person";

export interface Profiles {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string | null;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export function PersonProfilePage() {
  let apiKey = import.meta.env.VITE_API_KEY;
  const { id } = useParams();
  const { selectedPerson } = usePersonContext();
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [person, setPerson] = useState<PersonProps | null>(selectedPerson);

  const imgSize = "w500";
  const imgBaseUrl = "https://image.tmdb.org/t/p/";

  let baseUrl: string = "https://api.themoviedb.org/3/person";

  useEffect(() => {
    if (!selectedPerson && id) {
      fetch(`${baseUrl}/${id}?api_key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => setPerson(data));
      fetch(`${baseUrl}/${id}/images?api_key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => setProfiles(data.profiles || []));
    }
    if (selectedPerson) {
      setPerson(selectedPerson);
      fetch(`${baseUrl}/${selectedPerson.id}/images?api_key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => setProfiles(data.profiles || []));
    }
  }, [selectedPerson, id]);

  return (
    <div>
      <h1>{person ? person.name : "Loading..."}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {profiles.map((profile, index) => (
          <img
            key={index}
            src={`${imgBaseUrl}${imgSize}${profile.file_path}`}
            alt={`Profile ${index + 1}`}
            style={{ width: "200px", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
