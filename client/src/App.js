// import logo from './logo.svg';
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { HeroesPage } from "./pages/HeroesPage";
import { HeroPage } from "./pages/HeroPage";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HeroesPage />} />
        <Route path="/:id" element={<HeroPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <HeroesPage/> */}
      {/* <HeroPage/> */}
    </div>
  );
};

export default App;
