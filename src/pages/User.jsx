/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/user.css'

const User = () => {
  const [userName, setUserName] = useState('Anonimo')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('token', '')
    navigate('/login')
  }

  useEffect(() => {
    const storageUserName = localStorage.getItem('user')
    if (storageUserName) {
      setUserName(storageUserName)
    }
  }, [])

  return (
    <main className='user-container'>
      <div className='user'>
        <div className='user-avatar'>
          <i className='bx bx-user-circle' />
        </div>
        <h3 className='user-name'>{userName}</h3>
        <span onClick={logout} className='user-logut'>Logut</span>
      </div>
    </main>
  )
}

export default User
