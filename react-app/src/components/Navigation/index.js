import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	// console.log('is there a user', sessionUser)

	return (
		<ul id='navigation-list-container'>
			<li>
				<div id='navigation-logo-search'>
					{sessionUser ? (
						<>
							<NavLink exact to="/">bumblr</NavLink>
						</>
					) :
						<>
							<NavLink exact to="/">b</NavLink>
							<div id='navigation-search'>
								<input
									type='text'
									placeholder='Search Bumblr'
									disabled={true}
								></input>
							</div>
						</>
					}
				</div>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
