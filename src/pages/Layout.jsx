import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getLoggedInUser, logout } from '../redux/auth/authSlice'
import { ACCESS_TOKEN } from '../constants'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(getLoggedInUser)
  const handleLogout = () => {
   if (confirm("Confirm Logout?")){
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    dispatch(logout(accessToken))
    navigate('/login')
   }
  }
  

  return (
    <>
      <header style={{
        backgroundColor: '#6366F1',
        padding: '30px 20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',          
        }}>          
          <Link style={{
            color: 'white',
            cursor: 'pointer',
          }}
          title = 'Home'
          to={user ? "/" : "/login"}
          className='fa-solid fa-house'
          />
          {
            user?.email ? (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 10,        
            }}>
              {
                user?.role === 'admin' && (
                  <Link style={{
                    color: 'white',
                    cursor: 'pointer',
                  }}
                  title='Edit Movies'
                  to='/admin'
                  className='fa-solid fa-pen-to-square'
                  />
                )
              }
              <button style={{
                cursor: 'pointer',
              }} onClick={handleLogout} className='fa-solid fa-right-from-bracket'></button>
            </div>
          ) : (<></>)
          }
        </div>
      </header>
      <main style={{
        padding: 20
      }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
