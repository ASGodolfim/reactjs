import React from 'react'
import style from './About.module.css'
import { Link } from 'react-router-dom';


function About() {
  return (
    <div className={style.content}>
        <h1 className={style.brand}>About <span>Mini</span><span className={`${style.uppercase} ${style.bold}`}>Blog</span></h1>
        <p>a Blog created with React and JavaScript on the Front-end and Firebase on the Back-end</p>
        <Link to="/posts/create" className="btn">Create Post</Link>
    </div>
  )
}

export default About
