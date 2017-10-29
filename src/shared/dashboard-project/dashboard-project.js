import React from 'react';
import ModalWindow from '../modal-window/modal-window';
import './dashboard-project.css';

class DashboardProject extends React.Component {
    listItems = null;
    constructor(props) {
        super(props)
        const listOfProjects = [
            {
                projectNr: '0',
                name: 'project0'
            }, {
                projectNr: '1',
                name: 'project1'
            }, {
                projectNr: '2',
                name: 'project2'
            }, {
                projectNr: '3',
                name: 'project with very looooooooooooooooooooooooooooooooooooooooong name'
            }
        ];

        this.state = {
            copyOfListOfProjects: listOfProjects,
            modalWindowIsOpen: false
        };

    }

    removeProjeckt(index) {
        console.log(index);
        for (let i = 0, length = this.state.copyOfListOfProjects.length; i < length; i++) {
            if (this.state.copyOfListOfProjects[i].projectNr === index) {
                this.state.copyOfListOfProjects.splice(i, 1);
                break;
            }
        }
        this.setState({ copyOfListOfProjects: this.state.copyOfListOfProjects });
    }

    addProjeckt(name, projectNr) {
        console.log(name);
        console.log(projectNr);
        this.setState({ modalWindow: true });
        // for (let i = 0, length = this.state.copyOfListOfProjects.length; i < length; i++) {
        //     if (this.state.copyOfListOfProjects[i].projectNr === index) {
        //         this.state.copyOfListOfProjects.splice(i, 1);
        //         break;
        //     }
        // }
        // this.setState({ copyOfListOfProjects: this.state.copyOfListOfProjects });
    }

    openModalWindow() {
        console.log('lalala');
        this.setState({ modalWindowIsOpen: true });
        console.log(this.state);
    }

    closeModalWindow() {
        this.setState({ modalWindowIsOpen: false});
        console.log(this.state);
    }

    render() {
        this.listItems = this
            .state
            .copyOfListOfProjects
            .map((ele) => {
                return (
                    <li key={ele.projectNr}>
                        <div>
                            {ele.name}
                            {ele.projectNr}
                        </div>
                        <button className="in-list-button" onClick={() => { this.removeProjeckt(ele.projectNr) }}>
                            X
                        </button>
                        <button className="in-list-button" >
                            E
                        </button>
                    </li>
                )
            });
        // let modalWindow = this.state.modalWindow ? () : null;


        return (
            <div>
                <span>
                    Projects
                </span>
                < input className="searchbox" placeholder="search" />
                <div className="selectable-container">
                    <ul>
                        {this.listItems}
                    </ul>
                </div >
                < button className="button" onClick={() => { this.openModalWindow() }}>
                    Add project
                </button>
                <ModalWindow openModalWindow={this.state.modalWindowIsOpen} closeModalWindow={() => {this.closeModalWindow()}}>

                </ModalWindow>
            </div>
        );
    }
}

export default DashboardProject;