import React from 'react';
import './dashboard.css';
import DashboardProjects from '../../shared/dashboard-projects/dashboard-projects';
import DashboardTasks from '../../shared/dashboard-tasks/dashboard-tasks';

class Dashboard extends React.Component {

    copyOfListOfProjects = [];

    constructor(props) {
        super(props);

        const listOfProjects = [
            {
                projectNr: '0',
                name: 'project0',
                tasks: [
                    {
                        nr: '0',
                        name: 'task0',
                        status: 'complete'
                    },
                    {
                        nr: '1',
                        name: 'task1',
                        status: 'inProgress'
                    },
                    {
                        nr: '2',
                        name: 'task2',
                        status: 'todo'
                    }
                ]
            }, {
                projectNr: '1',
                name: 'Project1',
                tasks: [
                    {
                        nr: '0',
                        name: 'task1.0',
                        status: 'complete'
                    },
                    {
                        nr: '1',
                        name: 'task1.1',
                        status: 'inProgress'
                    },
                    {
                        nr: '2',
                        name: 'task1.2',
                        status: 'todo'
                    }
                ]
            }, {
                projectNr: '2',
                name: 'project2',
                tasks: [
                    {
                        nr: '0',
                        name: 'task2.0',
                        status: 'complete'
                    },
                    {
                        nr: '1',
                        name: 'task2.1',
                        status: 'inProgress'
                    },
                    {
                        nr: '2',
                        name: 'task2.2',
                        status: 'todo'
                    }
                ]
            }, {
                projectNr: '3',
                name: 'project with very looooooooooooooooooooooooooooooooooooooooong name',
                tasks: [
                    {
                        nr: '0',
                        name: 'task3.0',
                        status: 'complete'
                    },
                    {
                        nr: '1',
                        name: 'task3.1',
                        status: 'inProgress'
                    },
                    {
                        nr: '2',
                        name: 'task3.2',
                        status: 'todo'
                    }
                ]
            }
        ];
        //deep copy must be implemented here
        this.copyOfListOfProjects = listOfProjects;
        this.TMPARRR =  [
            {
                nr: '0',
                name: 'task0',
                status: 'complete'
            },
            {
                nr: '1',
                name: 'task1',
                status: 'inProgress'
            },
            {
                nr: '2',
                name: 'task2',
                status: 'todo'
            }
        ]
    }
    render() {
        return (
            <div className="mainContent">
                <div className="column">
                    <DashboardProjects listOfProjects={this.copyOfListOfProjects}></DashboardProjects>
                </div>
                <div className="column">
                    <DashboardTasks listOfTasks={this.TMPARRR}></DashboardTasks>
                </div>
                <div className="column"></div>
            </div>
        );
    }
}

export default Dashboard;