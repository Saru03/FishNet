import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';

// 🌐 Core Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/LoginSignup';
import About from './Components/About';
import User from './Components/User';
import Register from './Components/Register';

// 🧪 Quality Assurance
import Disease from './QualityAssurance/Disease';
import Freshness from './QualityAssurance/Freshness';
import QualityAssurance from './QualityAssurance/QualityAssurance';

// 📊 Price Forecast
import ForecastSections from './PriceForecast/ForecastSections';
import PriceForecast from './PriceForecast/PriceForecast';
import FishMarketComparator from './PriceForecast/FishMarketComparator';

// 📦 Inventory
import Inventory from './Inventory/Inventory';
import Fishlist from './Inventory/Fishlist';
import Orderlist from './Inventory/Orderlist';
import Saleslist from './Inventory/Saleslist';

// 🌍 Geo + Weather
import MapweatherSections from './GeoWeather/Mapwethersections'; // typo fixed here
import Maps from './GeoWeather/Maps';
import Weather from './GeoWeather/Weather';

// 🐟 Potential Fishing Zones
import PFZ from './PotentialfishingZones/pfz';

// 👤 Dashboard
import FishersDashboard from './Components/FishersDashboard';

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* 🌐 Public Core Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/register" element={<Register />} />

            {/* 🧪 Quality Assurance */}
            <Route path="/disease-detection" element={<Disease />} />
            <Route path="/freshness-detection" element={<Freshness />} />
            <Route path="/quality-assurance" element={<QualityAssurance />} />

            {/* 📊 Price Forecast */}
            <Route path="/forecast-section" element={<ForecastSections />} />
            <Route path="/price-forecast" element={<PriceForecast />} />
            <Route path="/fish-market-comparator" element={<FishMarketComparator />} />

            {/* 🔒 Protected Inventory Routes */}
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/inventory/fishlist" element={<ProtectedRoute><Fishlist /></ProtectedRoute>} />
            <Route path="/inventory/orderlist" element={<ProtectedRoute><Orderlist /></ProtectedRoute>} />
            <Route path="/saleslist" element={<ProtectedRoute><Saleslist /></ProtectedRoute>} />

            {/* 🌍 Maps & Weather */}
            <Route path="/mapsandweather" element={<MapweatherSections />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/weather" element={<Weather />} />

            {/* 🐟 PFZ */}
            <Route path="/fishing-zones" element={<PFZ />} />

            {/* 🔐 Dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><FishersDashboard /></ProtectedRoute>} />

            {/* ↪️ Redirects */}
            <Route path="/inventory/saleslist" element={<Navigate to="/saleslist" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
