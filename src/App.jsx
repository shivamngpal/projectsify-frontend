import { useState } from "react"
const api_url = import.meta.env.VITE_API_URL || "http:localhost:3000";

export default function App(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
          const response = await fetch(`${api_url}/api/auth/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email, password }),
            }
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
    }

    return (
      <>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    );
}