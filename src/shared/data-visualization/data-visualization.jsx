import React from 'react';
import PropTypes from 'prop-types';
import './data-visualization.css';
import PieChartCanvas from '../pie-chart-canvas/pie-chart-canvas';
import PieChartSvg from '../pie-chart-svg/pie-chart-svg';
import DonutChartSvg from '../donut-chart-svg/donut-chart-svg';

class DataVisualization extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };

    render() {
        this.copyOfListOfTasks = this.props.listOfTasks;
        return (
            <div>
                Lindsey Striling
                {/* <PieChartCanvas 
                    listOfTasks={this.copyOfListOfTasks}>
                </PieChartCanvas>
                <DonutChartSvg 
                    listOfTasks={this.copyOfListOfTasks}>
                </DonutChartSvg> */}
                <PieChartSvg 
                    listOfTasks={this.copyOfListOfTasks}>
                </PieChartSvg>
            </div>
        );
    }
}

export default DataVisualization;