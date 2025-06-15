import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const logo = {
  name: "All Nighter",
  imageUrl: '/logo.png',
  imageSize: 85,
};

function Home() {
  return <h2>Home Page Content</h2>;
}

function Planner() {
  return <h2>Planner Page Content</h2>;
}

function Flashcards() {
  return <h2>Flashcard Page Content</h2>;
}

function Quizzes() {
  return <h2>Quiz Page Content</h2>;
}

function Progress() {
  return <h2>Progress Page Content</h2>;
}

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

