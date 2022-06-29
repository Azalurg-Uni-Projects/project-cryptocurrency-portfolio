import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Session from './components/Session';
import Wallet from './components/Wallet';
import Market from './components/Market';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="Main">
        <Nav/>
        <Routes>
          <Route path="/session" element={<Session/>} />
          <Route path="/wallet" element={<Wallet/>} />
          <Route path="/" element={<Market/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;