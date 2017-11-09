import React from 'react';
import './modal-window.css';

class ModalWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    closeModalWindow(e) {
        e.preventDefault()
        if (this.props.closeModalWindow) {
            this.props.closeModalWindow();
        }
    }

    render() {
        if (!this.props.openModalWindow) {
            return null;
        }
        return (
            <div>
                <div className="modal-window ">
                    {this.props.children}
                </div>
                <div className="overlay" onClick={(e) => { this.closeModalWindow(e) }}></div>
            </div>
        );
    }
}

export default ModalWindow;