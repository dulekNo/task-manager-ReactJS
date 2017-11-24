import React from 'react';
import PropTypes from 'prop-types';
import './data-visualization.css';
import PieChart from '../pie-chart/pie-chart';

class DataVisualization extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };

    render() {
        this.copyOfListOfTasks = this.props.listOfTasks;
        return (
            <div>
                Lindsey Striling
                <PieChart 
                    listOfTasks={this.copyOfListOfTasks}>
                </PieChart>
            </div>
        );
    }
}

export default DataVisualization;