import { useAuth } from "../context/AuthContext";

export default function Planner() {
  const { user } = useAuth();
  
    if (!user) return (
      <div className="planner-container">
        <h2>Welcome to Planner!</h2>
        <p>Please sign in before using this feature.</p>
      </div>
    );

  return (
    <div className="planner-container">
      <h2>Welcome to Planner!</h2>
      <p>Use the planner, flashcards, quizzes, and progress tracker to study efficiently.</p>
    </div>
  );
}