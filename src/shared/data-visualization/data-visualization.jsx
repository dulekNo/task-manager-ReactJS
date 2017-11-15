import React from 'react';
import PropTypes from 'prop-types';
import './data-visualization.css';

class DataVisualization extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };


    render() {
        return (
            <div>
                Lindsey Striling
                <div className="pie-chart">
                    {/* <div className="pie-chart-first-part"></div> */}
                </div>


            </div>
        );
    }
}

export default DataVisualization;