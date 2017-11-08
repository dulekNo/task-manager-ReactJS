import React from 'react';
import ModalWindow from '../modal-window/modal-window';
import './dashboard-projects.css';

class DashboardProjects extends React.Component {
    listItems = null;
    constructor(props) {
        super(props)
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
            }
        ];

        this.state = {
            copyOfListOfProjects: listOfProjects,
            modalWindowIsOpen: false,
            searchProjeckt: null,
            newProjectNr: '',
            newProjectName: '',
            placeholderClass: '',
            underlineClass: 'underline-searchbox-close',
            searchInputWidth: '200'
        };

    }

    removeProjeckt(index) {
        for (let i = 0, length = this.state.copyOfListOfProjects.length; i < length; i++) {
            if (this.state.copyOfListOfProjects[i].projectNr === index) {
                this.state.copyOfListOfProjects.splice(i, 1);
                break;
            }
        }
        this.setState({ copyOfListOfProjects: this.state.copyOfListOfProjects });
    }

    addProjeckt(name, projectNr) {
        // console.log(name);
        // console.log(projectNr);
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
        this.setState({ modalWindowIsOpen: true });
    }

    closeModalWindow() {
        this.setState({ modalWindowIsOpen: false });
    }

    inputValueChange(e) {
        e.preventDefault();
        if (!this.doSearchInputIsEmpty()) {
            this.setState({
                searchProjeckt: e.target.value.toLowerCase(),
                searchInputWidth: 180
            });
        } else {
            this.setState({
                searchProjeckt: e.target.value.toLowerCase(),
                searchInputWidth: 200
            });
        }
    }

    handleChange(event) {


        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        // this.setState({ inputValue: event.target.value });
        //there should be chack if this numer is already used
    }

    handleSubmit(event) {
        event.preventDefault();
        let tmp = this.state.copyOfListOfProjects;
        tmp.push({
            projectNr: this.state.newProjectNr,
            name: this.state.newProjectName
        });
        this.setState({
            copyOfListOfProjects: tmp
        });
        this.closeModalWindow();
    }

    togglePlaceholder() {
        if (this.state.placeholderClass === '') {
            this.setState({
                placeholderClass: 'searchbox-placeholder-up'
            });
            this.textInput.focus();
        } else {
            this.setState({
                placeholderClass: ''
            });
        }
    }

    doSearchInputIsEmpty() {
        let val = this.textInput.value;
        if (val === null || val === undefined || val === '' || val === ' ') {
            return true;
        }
        return false;
    }

    movePlaceholderUp() {
        this.setState({
            placeholderClass: 'searchbox-placeholder-up',
            underlineClass: 'underline-searchbox-open'
        });
        this.textInput.focus();
    }

    movePlaceholderDown() {
        if (this.doSearchInputIsEmpty()) {
            this.setState({
                placeholderClass: '',
                underlineClass: ''
            });
        }

    }

    cleanSearchInput() {
        this.textInput.value = null;
        this.setState({
            searchProjeckt: null,
            searchInputWidth: 200
        });
        this.textInput.focus();
    }

    render() {
        // console.log('this.state.copyOfListOfProjects');
        // console.log(this.state);
        // console.log(this.state.copyOfListOfProjects);
        this.listItems = this.state.copyOfListOfProjects.map((ele) => {
            if (this.state.searchProjeckt !== null & ele.name.toString().toLowerCase().indexOf(this.state.searchProjeckt) === -1) {
                return null;
            }

            return (
                <li key={ele.projectNr}>
                    <div>
                        {ele.name}
                        {/* projectNr{ele.projectNr} */}
                    </div>
                    <button className="in-list-button" onClick={() => { this.removeProjeckt(ele.projectNr) }}>X</button>
                    <button className="in-list-button">E</button>
                </li>
            )
        });


        return (
            <div>
                <span className="block-title">
                    Projects
                </span>

                <div className="searchbox-input">
                    <input
                        style={{ width: this.state.searchInputWidth + 'px' }}
                        className="searchbox"
                        onChange={this.inputValueChange.bind(this)}
                        ref={(input) => { this.textInput = input; }}
                        onBlur={this.movePlaceholderDown.bind(this)} />
                    {this.state.searchInputWidth === 180 && <span className="clean-button" onClick={this.cleanSearchInput.bind(this)}>x</span>}
                    <span
                        className={'searchbox-placeholder ' + this.state.placeholderClass}
                        onClick={this.movePlaceholderUp.bind(this)} >
                        Search project
                    </span>
                    <span className={'underline-searchbox-close ' + this.state.underlineClass}></span>
                </div>

                <div className="selectable-container">
                    <ul>
                        {this.listItems}
                    </ul>
                </div >
                <button className="button" onClick={() => { this.openModalWindow() }}>
                    Add project
                </button>
                <ModalWindow openModalWindow={this.state.modalWindowIsOpen} closeModalWindow={() => { this.closeModalWindow() }}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <label>
                            Name:
                            <input type="text" name="newProjectNr" value={this.state.newProjectNr} onChange={this.handleChange.bind(this)} />
                        </label>
                        <label>
                            Nr:
                            <input type="text" name="newProjectName" value={this.state.newProjectName} onChange={this.handleChange.bind(this)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </ModalWindow>
            </div>
        );
    }
}

export default DashboardProjects;