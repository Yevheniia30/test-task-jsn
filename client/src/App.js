// import logo from './logo.svg';
import './App.css';
import { HeroesPage } from './pages/HeroesPage';
import { HeroPage } from './pages/HeroPage';

export const App=() =>{
  return (
    <div className="App">
     <HeroesPage/>
     <HeroPage/>
    </div>
  );
}

export default App;
