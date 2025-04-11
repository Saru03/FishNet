import './App.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layouts from './Components/Layout'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/LoginSignup';
import About from './Components/About';
import User from './Components/User';
import Register from './Components/Register';
import Button from './QualityAssurance/Button';
import Disease from './QualityAssurance/Disease';
import Freshness from './QualityAssurance/Freshness';

function App() {
  return (
    
    <Router>
      <Navbar />
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quality" element={<Button />} />
        <Route path="/disease-detection" element={<Disease />} />
        <Route path="/freshness-detection" element={<Freshness />} />
      </Routes>
    </Router>
    
  );
}

export default App;
