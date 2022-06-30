import React, { useEffect, useState }  from 'react'
import { Link } from "react-router-dom";
const Cookies = require('js-cookie')

const Nav = () => {

  function f(){
    Cookies.set("token", null, {expires: 0})
  }

    return(
        <nav className='Navigation'>
          <ul>
            <li>
              <Link to="/" className="Bnt">Market</Link>
            </li>
            <li>
              <Link to="/wallet" className="Bnt">Wallet</Link>
            </li>
          </ul>
          <ul>
            {/* <li>
              <Link to="/" className="Bnt">Register</Link>
            </li> */}
            <li>
              <Link to="/wallet" className="Bnt Blue">Login</Link>
            </li>
            <li>
              <button className="Bnt Purple" onClick={() => f()}>Logout</button>
            </li>           
          </ul>
        </nav>
    )
}

export default (Nav);