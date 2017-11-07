import React from 'react';
import './dashboard.css';
import DashboardProjects from '../../shared/dashboard-project/dashboard-project';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mainContent">
                <div className="column">
                    <DashboardProjects></DashboardProjects>
                </div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
        );
    }
}

export default Dashboard;