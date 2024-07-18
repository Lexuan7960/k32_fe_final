import { Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { login } from '../../redux/auth/authSlice'



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await dispatch(login({
      ...formData,      
    }))
    console.log("data login", data)
    if(data?.payload) {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <section style={{
      padding: 5,
      marginTop: 20,
    }} className='card'>
      <h1 className='title'>Login your account</h1>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
      }} onSubmit={handleLogin} >
          <input 
          type='email' 
          placeholder='Email' 
          className='input' 
          autoFocus value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} />
          <input
          type='password'
          placeholder='Password'
          className='input'
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})} />
          <button className='btn-login' type='submit'>Login
            {loading && <Spin style={{
              marginLeft: 10,
            }} size='small' />}
          </button>
          <p style={{
            marginTop: 10,           
          }}>
            You are not an account?{' '}<Link style={{
            color: 'blue',
          }} to='/register'>Register</Link>
          </p>
      </form>
    </section>
  )
}

export default Login
