
import React, { useState } from 'react';

const LoginWindow = (props) => {

    return (
        <div className="newlogin">
            <h4>You are logged out. Please log in for fully use the app</h4>
            <form onSubmit={props.loggingIn}>
                <div className="formfield">
                    <label className="loginlabel">Username</label>
                    <input name="username"></input>
                    <label className="loginlabel">Password</label>
                    <input type="password" name="password"></input>
                    <button type="button" className="closebutton" onClick={props.closedIn}>Close</button>
                    <button type="submit" className="sendbutton">Log in</button>
                </div>
            </form>
        </div>
    )

}

export default LoginWindow;
