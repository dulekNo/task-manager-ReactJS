import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../search-input/search-input';
import './dashboard-projects.css';

class DashboardProjects extends React.Component {

    static propTypes = {
        listOfProjects: PropTypes.array.isRequired
    };

    listItems = null;

    constructor(props) {
        super(props);

        this.state = {
            searchProject: null,
            selectedProject: null
        };
    }

    redirectTo(ele) {
        //drilDown to tasks/else
    }

    setSearchedProject(name) {
        this.setState({
            searchProject: name
        });
    }

    selectProject(elemNr) {
        this.setState({
            selectedProject: elemNr
        });
    }

    render() {
        // console.log(this.state);

        this.tmpArray = this.props.listOfProjects || [];

        this.listItems = this.tmpArray.map((ele) => {
            if (this.state.searchProject !== null & ele.name.toString().toLowerCase().indexOf(this.state.searchProject) === -1) {
                return null;
            }
            return (
                <li key={ele.projectNr} className={this.state.selectedProject === ele.projectNr ? 'selectedProject' : ''}>
                    <div onClick={() => { this.selectProject(ele.projectNr) }}>
                        {ele.name}
                    </div>
                    <button className="in-list-button" onClick={() => { this.redirectTo(ele.projectNr) }}>D</button>
                </li>
            )
        });


        return (
            <div>
                <span className="block-title">
                    Projects
                </span>

                <SearchInput setSearchedElement={this.setSearchedProject.bind(this)} label={'Search project'} />

                <div className="selectable-container">
                    <ul>
                        {this.listItems}
                    </ul>
                </div>
            </div>
        );
    }
}

export default DashboardProjects;