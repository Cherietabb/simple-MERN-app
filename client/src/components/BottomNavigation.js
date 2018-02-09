import React from 'react';
import BottomNavigation from 'material-ui/BottomNavigation';


const contentStyle = {
	root: {
		width: 200
	},
	display: 'flex',
	padding: '50px',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'space-between'
};

const Navigation = () => {
	return (
		<BottomNavigation style={contentStyle}>
			<div className="text-center center-block">
				<div>
				</div>
			</div>
			<p>
				<small>Created 2017 by Cherie Tabb</small>
			</p>
		</BottomNavigation>
	)
};

export default Navigation;