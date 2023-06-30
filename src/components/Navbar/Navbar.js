import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function Navbar() {

	const activeLink = 'nav__link nav__link--active';
	const normalLink = 'nav__link';

	return (
		<nav className="nav">
			<ul className="nav__lists">
				<li className='nav__item'>
					<NavLink
						to="/"
						className={({isActive}) => isActive ? activeLink : normalLink}
					>
						Home
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink
						to="/404"
						className={({isActive}) => isActive ? activeLink : normalLink}
						>
						404
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;