import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>Creado por Noé Hernández (2023) ©</p>
      <section className='social'>

        <a href='https://github.com/Noehernandez24' target='_blank' rel='noreferrer'>
          <i className='bx bxl-github bx-md social-icon' />
        </a>

        <a href='https://www.linkedin.com/in/noe-hdz-dev/' target='_blank' rel='noreferrer'>
          <i className='bx bxl-linkedin bx-md social-icon' />
        </a>

        <a href='mailto:evilld94@gmail.com' target='_blank' rel='noreferrer'>
          <i className='bx bx-envelope bx-md social-icon' />
        </a>

      </section>
    </footer>
  )
}

export default Footer
