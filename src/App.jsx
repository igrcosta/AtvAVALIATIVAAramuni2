import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Home from './pages/Home';
import Resultado from './pages/Resultado';
import Votacao from './pages/Votacao';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="rodape">DIAW 2026, PUC Minas, Igor Costa</footer>
    </>
  );
}

export default App;
