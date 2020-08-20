import React from "react";
import {Redirect} from 'react-router';

export const Logout =  () => {
	let redirectVar = null;
	localStorage.removeItem('email');
	localStorage.removeItem('admin');
	if (!localStorage.getItem('email')) {
		redirectVar = <Redirect to="/" />;
	}
  return (
	<div>
		{redirectVar}
	</div>
  );
};
