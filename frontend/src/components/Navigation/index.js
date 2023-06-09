import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id='navbar'>
      <ul className='navitems'>
        <li className='homeButton'>
          <NavLink exact to="/" >
            <i className="fa-brands fa-airbnb" id='abnbIcon'>
            <div className='pokebnb'>pokebnb</div>
          </i>
          </NavLink>
        </li>
        <li className='navRight'>
          {sessionUser && (
            <li className="CreateSpotButton">
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
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
