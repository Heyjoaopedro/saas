import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password }, { withCredentials: true })
      console.log(res.data)
      // redirecionar ou salvar no estado global se necessário
    } catch (err: unknown) {
      setError('Credenciais inválidas')
      console.error(err)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </div>
  )
}
