import React, { useEffect, useState }  from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav className='Navigation'>
          <ul>
            <li>
              <Link to="/" className="Bnt">Market</Link>
            </li>
            <li>
              <Link to="/wallet" className="Bnt">Wallet</Link>
            </li>
            <li>
              <Link to="/" className="Bnt">Make transaction</Link>
            </li>
          </ul>
          <ul>
            {/* <li>
              <Link to="/" className="Bnt">Register</Link>
            </li> */}
            <li>
              <Link to="/" className="Bnt Blue">Login</Link>
            </li>
          </ul>
        </nav>
    )
}

export default (Nav);