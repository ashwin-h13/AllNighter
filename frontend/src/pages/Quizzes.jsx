import { useAuth } from "../context/AuthContext";

export default function Quizzes() {
  const { user } = useAuth();
    
  if (!user) return (
    <div className="quizzes-container">
      <h2>Welcome to Quizzes!</h2>
      <p>Please sign in before using this feature.</p>
    </div>
  );

  return (
    <div className="quizzes-container">
      <h2>Welcome to Quizzes!</h2>
      <p>Use the planner, flashcards, quizzes, and progress tracker to study efficiently.</p>
    </div>
  );
}