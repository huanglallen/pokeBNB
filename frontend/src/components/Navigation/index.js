import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/">
            <i className="fa-brands fa-airbnb">
              pokebnb
            </i></NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink exact to='/spots/new'>
              Create a New Spot
            </NavLink>
          </li>
        )}
        {isLoaded && (
          <li className='profileButton'>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
