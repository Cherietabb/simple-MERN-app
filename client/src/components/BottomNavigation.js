import React from 'react';


const contentStyle = {
	display: 'flex',
	padding: '50px',
	justifyContent: 'center'
};

const BottomNavigation = () => {
	return (
		<div style={contentStyle} className="container" id="bottom-content">
			<div className="text-center center-block">
				<div className="navbar fixed-bottom navbar-light bg-faded">
				</div>
			</div>
			<p>
				<small>Created 2017 by Cherie Tabb</small>
			</p>
		</div>
	)
};

export default BottomNavigation;