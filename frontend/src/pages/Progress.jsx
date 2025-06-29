import { useAuth } from "../context/AuthContext";

export default function Progress() {
  const { user } = useAuth();
      
  if (!user) return (
    <div className="progress-container">
      <h2>Welcome to Progress!</h2>
      <p>Please sign in before using this feature.</p>
    </div>
    );

  return (
    <div className="progress-container">
      <h2>Welcome to Progress!</h2>
      <p>Use the planner, flashcards, quizzes, and progress tracker to study efficiently.</p>
    </div>
  );
}