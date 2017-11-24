import React from 'react';
import './dashboard.css';
import DashboardProjects from '../../shared/dashboard-projects/dashboard-projects';
import DashboardTasks from '../../shared/dashboard-tasks/dashboard-tasks';
import DataVisualization from '../../shared/data-visualization/data-visualization';

class Dashboard extends React.Component {

    copyOfListOfProjects = [];

    constructor(props) {
        super(props);

        this.state = {
            selectedProject: null,
            selectedTask: null
        };


        const listOfProjects = [
            {
                projectNr: '0',
                name: 'project0',
                tasks: [
                    {
                        nr: '0',
                        name: 'task0',
                        status: 'completed'
                    }, {
                        nr: '1',
                        name: 'task1',
                        status: 'inProgress'
                    }, {
                        nr: '2',
                        name: 'task2',
                        status: 'todo'
                    }, {
                        nr: '3',
                        name: 'task3',
                        status: 'todo'
                    }, {
                        nr: '4',
                        name: 'task4',
                        status: 'completed'
                    }, {
                        nr: '5',
                        name: 'task5',
                        status: 'completed'
                    }, {
                        nr: '6',
                        name: 'task6',
                        status: 'completed'
                    }, {
                        nr: '7',
                        name: 'task7',
                        status: 'completed'
                    }
                ]
            }, {
                projectNr: '1',
                name: 'Project1',
                tasks: [
                    {
                        nr: '0',
                        name: 'task1.0',
                        status: 'completed'
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
                        status: 'completed'
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
                        status: 'completed'
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
        this.copyOfListOfTasks = [];
        this.TMPARRR = [
            {
                nr: '0',
                name: 'task0',
                status: 'completed'
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

    setSlectedProject(elemNr) {
        if (this.state.selectedProject !== elemNr) {
            let selectedProject = this.copyOfListOfProjects.filter(function (project) {
                return project.projectNr === elemNr;
            });
            this.copyOfListOfTasks = selectedProject[0].tasks;
            this.setState({
                selectedProject: elemNr,
                selectedTask: null
            });
        }
    }

    setSelectedTask(elemNr) {
        this.setState({
            selectedTask: elemNr
        });
    }

    render() {
        return (
            <div className="mainContent">
                <div className="column">
                    <DashboardProjects
                        listOfProjects={this.copyOfListOfProjects}
                        setSlectedProject={this.setSlectedProject.bind(this)}
                        selectedProject={this.state.selectedProject}>
                    </DashboardProjects>
                </div>
                <div className="column">
                    <DashboardTasks
                        listOfTasks={this.copyOfListOfTasks}
                        setSelectedTask={this.setSelectedTask.bind(this)}
                        selectedTask={this.state.selectedTask}>
                    </DashboardTasks>
                </div>
                <div className="column">
                    <DataVisualization
                        listOfTasks={this.copyOfListOfTasks}>
                    </DataVisualization>
                </div>
            </div>
        );
    }
}

export default Dashboard;