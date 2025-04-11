import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/LoginSignup';
import About from './Components/About';
import User from './Components/User';
import Register from './Components/Register';


import Disease from './QualityAssurance/Disease';
import Freshness from './QualityAssurance/Freshness';
import QualityAssurance from './QualityAssurance/QualityAssurance';


import ForecastSections from './PriceForecast/ForecastSections';
import PriceForecast from './PriceForecast/PriceForecast';
import MarketPricePrediction from './PriceForecast/MarketPricePrediction';
import FishMarketComparator from './PriceForecast/FishMarketComparator';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/register" element={<Register />} />

          
            <Route path="/disease-detection" element={<Disease />} />
            <Route path="/freshness-detection" element={<Freshness />} />
            <Route path="/quality-assurance" element={<QualityAssurance />} />

           
            <Route path="/forecast" element={<ForecastSections />} />
            <Route path="/price-forecast" element={<PriceForecast />} />
            <Route path="/market-price-prediction" element={<MarketPricePrediction />} />
            <Route path="/fish-market-comparator" element={<FishMarketComparator />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
