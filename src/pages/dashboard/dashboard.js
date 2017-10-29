import React from 'react';
import './dashboard.css';
import DashboardProject from '../../shared/dashboard-project/dashboard-project';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mainContent">
                <div className="column">
                    <DashboardProject></DashboardProject>
                </div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
        );
    }
}

export default Dashboard;