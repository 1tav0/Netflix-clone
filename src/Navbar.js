import React, {useEffect, useState} from 'react'
import './Navbar.css';


const Navbar = () => {
    //when we scroll down we need to show the black part of the navbar not see through like it is when it loads
    const [show, handleShow] = useState(false);
    
    useEffect(() => { //scroll listener attached to the window
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll",handleShow);
        };
    }, []);//empty [] will run once

    return (
        <div className={`navbar ${show && "nav__black"}`}> {/*if we scroll pass 100 pixels aka gets a new css classname */}
          <img
            className='nav__logo'
            src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol.jpg'
              alt="Netflix Logo"
          />
          <img 
            className='nav__avatar'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
              alt='Netflix Avatar'
          />
        
      </div>
  )
}

export default Navbar