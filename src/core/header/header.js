import './header.css';
import React from 'react';
import {NavLink} from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends React.Component {
    lama() {
        console.log(this);
    }

    render() {
        console.log(this);
        console.log(this.props.location);
        const { match, location, history } = this.props
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
                                <span className="leClass"></span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/tasks" activeClassName="selected-link">
                                Tasks
                                <span className="leClass"></span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

const ShowTheLocationWithRouter = withRouter(Header);

export default Header;