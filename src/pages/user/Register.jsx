import { Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { register } from '../../redux/auth/authSlice'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(false)
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await dispatch(register({ ...formData }))
    console.log("data register", data)
    if(data?.payload) {
      navigate('/login')
    }
    setLoading(false)
  }

  return (
    <session style={{
      padding: 5,
      marginTop: 20,
    }} className='card'>
      <h1 className='title'>Create a new account</h1>
      <form 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
      }} onSubmit={handleRegister}
      >
        <input 
        type='email' 
        placeholder='Email' 
        className='input' 
        autoFocus 
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}/>
        <input 
        type='password'
        placeholder='Password'
        className='input'
        value={formData.password}
        onChange={e => setFormData({...formData, password: e.target.value})} />
        <button
        className='btn-register'
        type='submit'
        >Register
        {loading && <Spin style={{ marginLeft: 10, }} size='small' />}
        </button>
        <p className='mt-[5px]'>You have an account? <Link style={{
          color: 'blue',          
        }} to={"/login"}>Login</Link></p>
      </form>
    </session>
  )
}

export default Register
