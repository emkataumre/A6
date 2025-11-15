import { createContext, useContext, useState, type ReactNode } from "react";
import { type PersonProps } from "../components/Person";

interface PersonContextType {
  selectedPerson: PersonProps | null;
  setSelectedPerson: (person: PersonProps) => void;
}

const PersonContext = createContext<PersonContextType | undefined>(undefined);

export const usePersonContext = () => {
  const ctx = useContext(PersonContext);
  if (!ctx) throw new Error("usePersonContext not filled");
  return ctx;
};

export function PersonProvider({ children }: { children: ReactNode }) {
  const [selectedPerson, setSelectedPerson] = useState<PersonProps | null>(
    null
  );

  return (
    <PersonContext.Provider value={{ selectedPerson, setSelectedPerson }}>
      {children}
    </PersonContext.Provider>
  );
}
