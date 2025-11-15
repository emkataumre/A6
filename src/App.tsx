import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PersonProfilePage } from "./pages/PersonProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { PersonProvider } from "./store/PersonContext";

function App() {
  return (
    <PersonProvider>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/person/:id" element={<PersonProfilePage />} />
      </Routes>
    </PersonProvider>
  );
}

export default App;
