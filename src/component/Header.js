import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/Cart'>Cart</Link>
        <Link to='/order'>order</Link>
        <Link to='/Login'>Login</Link>
        <Link to='/Signup'>Signup</Link>

    </div>
  )
}

export default Header