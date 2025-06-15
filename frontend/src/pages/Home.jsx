import { useState } from 'react';

export default function Home() {
  const [formType, setFormType] = useState('signup'); // 'signup' or 'signin'
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formType === 'signup') {
      setMessage(`Account created for ${form.username || form.email}!`);
    } else {
      setMessage(`Signed in as ${form.username || form.email}!`);
    }
  }

  function toggleForm() {
    setFormType(formType === 'signup' ? 'signin' : 'signup');
    setForm({ username: '', email: '', password: '' }); // reset form
    setMessage('');
  }

  return (
    <div
      className="home-container"
      style={{ paddingTop: "100px", textAlign: "center" }}
    >
      <h2>Welcome to All Nighter!</h2>
      <p>
        With this website, you can plan, create flashcards, quiz yourself, and
        view your progress.
      </p>
      <p>Before getting started, please sign in or create an account below.</p>

      <div
        style={{ maxWidth: "400px", margin: "20px auto", textAlign: "left" }}
      >
        <button
          onClick={toggleForm}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#a37cf0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Switch to {formType === "signup" ? "Sign In" : "Sign Up"}
        </button>

        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: 'center' }}>
            {formType === "signup" ? "Create Account" : "Sign In"}
          </h3>

          {formType === "signup" && (
            <label>
              Username:
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                // style={{ width: '100%', marginBottom: '10px' }}
                style={{
                  width: "100%",
                  marginBottom: "15px",
                  padding: "8px 8px", // makes input taller
                  borderRadius: "12px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
            </label>
          )}

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                  width: "100%",
                  marginBottom: "15px",
                  padding: "8px 8px", // makes input taller
                  borderRadius: "12px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
            />
          </label>

          <label>
            Password:
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                  width: "100%",
                  marginBottom: "15px",
                  padding: "8px 8px", // makes input taller
                  borderRadius: "12px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
            />
          </label>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#6c56d9",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {formType === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {message && (
          <p style={{ textAlign: 'center', color: "green", marginTop: "15px" }}>{message}</p>
        )}
      </div>
    </div>
  );
}
