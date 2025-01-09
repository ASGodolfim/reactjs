import React from 'react'
import style from './Footer.module.css'

function Footer() {
  return (
    <footer className={style.footer}>
      <span className={style.created}>Created By Arthur Stone</span>
      <p className={style.copyright}>Miniblog &copy; 2024</p>
    </footer>
  )
}

export default Footer
