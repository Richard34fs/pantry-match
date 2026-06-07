import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    try{
      const response = await api.post('/login', formData);
      localStorage.setItem("token", response.data.access_token);
      navigate('/refrigerator');
    } catch (error){
        console.error(error)
    };
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
