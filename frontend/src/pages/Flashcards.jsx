import { useAuth } from "../context/AuthContext";

export default function Flashcards() {
  const { user } = useAuth();

  if (!user) return (
    <div className="flashcards-container">
      <h2>Welcome to Flashcards!</h2>
      <p>Please sign in before using this feature.</p>
    </div>
  );

  return (
    <div className="flashcards-container">
      <h2>Welcome to Flashcards!</h2>
      <p>Use the planner, flashcards, quizzes, and progress tracker to study efficiently.</p>
    </div>
  );
}