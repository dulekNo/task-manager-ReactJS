import React from 'react';
import './search-input.css';

class SearchInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            placeholderClass: '',
            underlineClass: 'underline-searchbox-close',
            searchInputWidth: '200'
        };
    }


    inputValueChange(e) {
        e.preventDefault();
        if (!this.doSearchInputIsEmpty()) {
            this.props.setSearchedProjeck(e.target.value.toLowerCase());
            this.setState({ searchInputWidth: 180 });
        } else {
            this.props.setSearchedProjeck(e.target.value.toLowerCase());
            this.setState({ searchInputWidth: 200 });
        }
    }


    togglePlaceholder() {
        if (this.state.placeholderClass === '') {
            this.setState({ placeholderClass: 'searchbox-placeholder-up' });
            this.textInput.focus();
        } else {
            this.setState({ placeholderClass: '' });
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
        this.props.setSearchedProjeck(null);
        this.setState({ searchInputWidth: 200 });
        this.textInput.focus();
    }

    render() {
        return (
            <div className="searchbox-input">
                <input
                    style={{ width: this.state.searchInputWidth + 'px' }}
                    className="searchbox"
                    onChange={this.inputValueChange.bind(this)}
                    ref={(input) => { this.textInput = input; }}
                    onBlur={this.movePlaceholderDown.bind(this)} />
                {this.state.searchInputWidth === 180 && <span className="clean-button" onClick={this.cleanSearchInput.bind(this)}>x</span>}
                <span
                    className={"searchbox-placeholder " + this.state.placeholderClass}
                    onClick={this.movePlaceholderUp.bind(this)} >
                    Search project
                </span>
                <span className={"underline-searchbox-close " + this.state.underlineClass}></span>
            </div>
        )
    };
}

export default SearchInput;