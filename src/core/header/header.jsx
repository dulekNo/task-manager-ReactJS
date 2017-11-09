import './header.css';
import React from 'react';
import {NavLink} from 'react-router-dom';;

class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="header-content">
                    <div className="app-name">
                        Task Manager
                    </div>
                    <ul>
                        <li>
                            <NavLink exact to="/" activeClassName="selected-link">
                                Dashboard
                                <span className="selected-route-underline"></span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tasks" activeClassName="selected-link">
                                Tasks
                                <span className="selected-route-underline"></span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}


export default Header;