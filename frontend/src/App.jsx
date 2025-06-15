import './App.css'
import { useState } from 'react';


const logo = {
  name: "All Nighter",
  imageUrl: '/logo.png',
  imageSize: 85,
};

export default function App() {
  const[count, setCount] = useState(0);

  function handleClick(){
    setCount(count + 1);
  }

  return (
    <>
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
          <h1 className="title">All Nighter</h1>
        </div>
        <div className="navbar-right">
          <a href="#planner">Planner</a>
          <a href="#flashcards">Flashcards</a>
          <a href="#quizzes">Quizzes</a>
          <a href="#progress">Progress</a>
        </div>
      </nav>
    </>
  );
}


function MyButton({count, onClick}){
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}