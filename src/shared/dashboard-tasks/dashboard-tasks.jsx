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

    // setSelectedTask(elemNr) {
    //     this.setState({
    //         selectedTask: elemNr
    //     });
    //     this.props.selectedTask(elemNr);
    // }

    clearSelectedTask() {
        this.props.setSelectedTask(null);
    }

    setTaskStyleClass(status) {
        if (status === 'completed') {
            return 'task-done';
        }
        if (status === 'inProgress') {
            return 'task-in-progress';
        }
        if (status === 'todo') {
            return 'task-todo';
        }
        return '';
    }

    render() {

        this.renderArray = this.props.listOfTasks || [];
        this.taskClass = '';

        if (this.props.selectedTask !== null) {
            this.listItems = this.renderArray.map((ele) => {
                if (this.props.selectedTask === ele.nr) {

                    this.taskClass = this.setTaskStyleClass(ele.status);

                    return (
                        <div key={ele.nr}>
                            <li className={`listElement ${(this.props.selectedTask === ele.nr ? 'selectedTask' : '')} ${this.taskClass}`}>
                                {/* <li key={ele.nr} className='selectedTask'> */}
                                <div>
                                    {ele.name}
                                </div>
                                <button className="in-list-button" onClick={() => { this.redirectTo(ele.nr) }}>D</button>
                            </li>
                            <div className="outer-button" onClick={() => { this.clearSelectedTask() }}>
                                <div className="outer-button-wraper">X</div>
                            </div>
                        </div>
                    );

                } else {
                    return null;
                }
            });
        } else {
            this.listItems = this.renderArray.map((ele) => {
                if (this.state.searchTask !== null & ele.name.toString().toLowerCase().indexOf(this.state.searchTask) === -1) {
                    return null;
                }

                this.taskClass = this.setTaskStyleClass(ele.status);

                return (
                    <li key={ele.nr} className={`listElement ${(this.props.selectedTask === ele.nr ? 'selectedTask' : '')} ${this.taskClass}`}>
                        <div onClick={() => { this.props.setSelectedTask(ele.nr) }}>
                            {ele.name}
                        </div>
                        <button className="in-list-button" onClick={() => { this.redirectTo(ele.nr) }}>D</button>
                    </li>
                );
            });
        }

        if (this.renderArray.length === 0) {
            return null;
        }

        return (
            <div>
                <span className="block-title">
                    Tasks
                </span>
                {/* onClickFunction={this.clearSelectedTask.bind(this)} */}
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
