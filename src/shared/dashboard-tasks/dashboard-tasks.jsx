import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../search-input/search-input';
import './dashboard-tasks.css';

class DashboardTasks extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };

    listItems = [];

    constructor(props) {
        super(props);

        this.state = {
            searchTask: null,
            selectedTask: null
        };
    }

    redirectTo(ele) {
        //drilDown to tasks/else
    }

    setSearchedTask(name) {
        this.setState({
            searchTask: name
        });
    }

    setSelectedTask(elemNr) {
        this.setState({
            selectedTask: elemNr
        });
    }

    clearSelectedTask(elemNr) {
        this.setState({
            selectedTask: null
        });
    }

    setTaskStyleClass(status) {
        if (status === 'complete') {
            return 'task-done';
        } else {
            if (status === 'inProgress') {
                return 'task-in-progress';
            } else {
                if (status === 'todo') {
                    return 'task-todo';
                } else {
                    return '';
                }
            }
        }
    }

    render() {

        this.tmpArray = this.props.listOfTasks || [];
        this.taskClass = '';

        if (this.state.selectedTask !== null) {
            this.listItems = this.tmpArray.map((ele) => {
                if (this.state.selectedTask === ele.nr) {

                    this.taskClass = this.setTaskStyleClass(ele.status);

                    return (
                        <div key={ele.nr}>
                            <li className={this.selectedTask}>
                                {/* <li key={ele.nr} className='selectedTask'> */}
                                <div>
                                    {ele.name}
                                </div>
                                <button className="in-list-button" onClick={() => { this.redirectTo(ele.nr) }}>D</button>
                            </li>
                            <div className="outer-button" onClick={() => { this.clearSelectedTask(ele.nr) }}>
                                <div className="outer-button-wraper">X</div>
                            </div>
                        </div>
                    );

                } else {
                    return null;
                }
            });
        } else {
            this.listItems = this.tmpArray.map((ele) => {
                if (this.state.searchTask !== null & ele.name.toString().toLowerCase().indexOf(this.state.searchTask) === -1) {
                    return null;
                }
                
                this.taskClass = this.setTaskStyleClass(ele.status);
                console.log(this.taskClass);

                return (
                    <li key={ele.nr} className={(this.state.selectedTask === ele.nr ? 'selectedTask' : '') + this.taskClass}>
                        <div onClick={() => { this.setSelectedTask(ele.nr) }}>
                            {ele.name}
                        </div>
                        <button className="in-list-button" onClick={() => { this.redirectTo(ele.nr) }}>D</button>
                    </li>
                );
            });
        }

        return (
            <div>
                <span className="block-title">
                    Tasks
                </span>

                <SearchInput setSearchedElement={this.setSearchedTask.bind(this)} label={'Search task'} />

                <div className="selectable-container-task">
                    <ul>
                        {this.listItems}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DashboardTasks;
