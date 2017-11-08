import React from 'react';
import SearchInput from '../search-input/search-input';
import './dashboard-projects.css';

class DashboardProjects extends React.Component {
    listItems = null;
    constructor(props) {
        super(props);
        const listOfProjects = [
            {
                projectNr: '0',
                name: 'project0'
            }, {
                projectNr: '1',
                name: 'Project1'
            }, {
                projectNr: '2',
                name: 'project2'
            }, {
                projectNr: '3',
                name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '4',
                //     name: 'Project1'
                // }, {
                //     projectNr: '5',
                //     name: 'project2'
                // }, {
                //     projectNr: '6',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '7',
                //     name: 'Project1'
                // }, {
                //     projectNr: '8',
                //     name: 'project2'
                // }, {
                //     projectNr: '9',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '10',
                //     name: 'Project1'
                // }, {
                //     projectNr: '11',
                //     name: 'project2'
                // }, {
                //     projectNr: '12',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '13',
                //     name: 'Project1'
                // }, {
                //     projectNr: '14',
                //     name: 'project2'
                // }, {
                //     projectNr: '15',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '16',
                //     name: 'Project1'
                // }, {
                //     projectNr: '17',
                //     name: 'project2'
                // }, {
                //     projectNr: '18',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '19',
                //     name: 'Project1'
                // }, {
                //     projectNr: '20',
                //     name: 'project2'
                // }, {
                //     projectNr: '21',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '22',
                //     name: 'Project1'
                // }, {
                //     projectNr: '23',
                //     name: 'project2'
                // }, {
                //     projectNr: '24',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
                // }, {
                //     projectNr: '25',
                //     name: 'Project1'
                // }, {
                //     projectNr: '26',
                //     name: 'project2'
                // }, {
                //     projectNr: '27',
                //     name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
            }
        ];

        // this.selectProject = this.selectProject.bind(this);

        this.state = {
            copyOfListOfProjects: listOfProjects,
            searchProjeckt: null,
            selectedProject: null
        };
    }

    redirectTo(ele) {
        //drilDown to tasks/else
    }

    setSearchedProjeckt(name) {
        this.setState({
            searchProjeckt: name
        });
    }

    selectProject(elemNr) {
        this.setState({
            selectedProject: elemNr
        });
    }

    render() {
        // console.log('this.state.copyOfListOfProjects');
        console.log(this.state);
        // console.log(this.state.copyOfListOfProjects);
        this.listItems = this.state.copyOfListOfProjects.map((ele) => {
            if (this.state.searchProjeckt !== null & ele.name.toString().toLowerCase().indexOf(this.state.searchProjeckt) === -1) {
                return null;
            }
            return (
                <li key={ele.projectNr} className={this.state.selectedProject == ele.projectNr ? 'selectedProject' : ''}>
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

                <SearchInput setSearchedProjeck={this.setSearchedProjeckt.bind(this)} />

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