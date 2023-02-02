import React from 'react'
import '../styles/loader.css'

const AppLoader = () => {
  return (
    <div className='overlay'>
      <div className='lds-ellipsis'><div /><div /><div /><div /></div>
    </div>
  )
}

export default AppLoader
