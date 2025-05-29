import { useState } from 'react';
import './App.css'
import app from './firebase'
import { getAuth } from 'firebase/auth';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'

const auth = getAuth(app);


function App() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null)

    const signUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      alert("Signed up!");
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      alert("Logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    alert("Logged out!");
  };
  
  return (
    <div style={{ padding: 20 }}>
      <h2>🔥 Firebase Auth with Vite + React</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={signUp}>Sign Up</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      <h3>{user ? `Logged in as: ${user.email}` : "Not logged in"}</h3>
    </div>
  )
}

export default App
