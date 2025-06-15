import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'; 
import Planner from './pages/Planner'; 
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';
import Progress from './pages/Progress';


const logo = {
  name: "All Nighter",
  imageUrl: '/logo.png',
  imageSize: 85,
};

export default function App() {
  return (
    <>
      <Router>
        <nav className="navbar">
          <div className="navbar-left">
            <img
              className="logo"
              src={logo.imageUrl}
              alt={"Logo of " + logo.name}
              style={{
                width: logo.width,
                height: logo.height,
              }}
            />
            <Link to="/" className="title-link">
              <h1 className="title">All Nighter</h1>
            </Link>
          </div>
          <div className="navbar-right">
            <Link to="/planner">Planner</Link>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/progress">Progress</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Router>
    </>
  );
}

