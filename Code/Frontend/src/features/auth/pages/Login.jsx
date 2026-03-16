import React, { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

  return (
    <main className="login-page">
      <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">  // ye form-group iss file me 2 baar repeat ho rha hai and Register.jsx me bhi 3 baar repeat hoga, isliye hm iske liye seperate component bna lenge "FormGroup.jsx"
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required/>
            </div> */}
            <FormGroup
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormGroup
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='button'>Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register Here</Link></p>
          </div>
    </main>
  )
}

export default Login
