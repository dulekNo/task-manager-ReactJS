import React from 'react';
import PropTypes from 'prop-types';
import './donut-chart-svg.css';

class DonutChartSVG extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.colorsForData = [];
        this.taskDone = '#beff58';
        this.taskInProgress = '#53ffe5';
        this.taskTodo = '#f0f1e3';
    }

    countDataForChart() {
        this.colors = [];
        this.colors = this.copyOfListOfTasks.map((ele) => {
            return ele.status;
        });
        this.colors = this.colors.filter((x, i, ele) => {
            return ele.indexOf(x) === i;
        });

        this.colors = this.colors.map((color) => {
            if (color === "completed") {
                return this.taskDone;
            }
            if (color === "inProgress") {
                return this.taskInProgress;
            }
            if (color === "todo") {
                return this.taskTodo;
            }
            return '';
        });

        this.tasksData = {};
        this.copyOfListOfTasks.forEach((ele) => {
            if (!this.tasksData[ele.status]) {
                this.tasksData[ele.status] = 1;
            } else {
                this.tasksData[ele.status]++;
            }
        });

        this.data = [];
        //we should use it, but right now we dont need to
        // for (let categ in options.data) {
        //     val = options.data[categ];
        //     total_value += val;
        // }
        this.totalTasksQuentity = this.copyOfListOfTasks.length;
        for (let ele in this.tasksData) {
            this.data.push(this.tasksData[ele] / this.totalTasksQuentity);
            // break;
        }
    }


    render() {
        this.copyOfListOfTasks = this.props.listOfTasks;
        this.data = [];
        this.colors = [];
        this.totalTasksQuentity = this.copyOfListOfTasks.length;
        this.countDataForChart();

        let tasksDataKeys = Object.keys(this.tasksData);
        let index = -1;
        this.dataLegent = [];
        for (let ele in this.data) {
            this.dataLegent.push(Math.round(this.data[ele] * 10000) / 100);
        }
        this.legendList = this.dataLegent.map((data) => {
            index++;
            return (
                <div 
                    key={index} 
                    style={{ backgroundColor: this.colors[index % this.colors.length] }}
                    className="legent-text-padding">
                    {tasksDataKeys[index]} 
                    <span className="float-right">{data}%</span>
                </div>
            )
        });

        index = -1;
        let donutCircuit = 36;
        let sliceDonutCircuit = 0;
        let curentDashoffset = 0;

        this.donutSliceList = this.data.map((data) => {
            index++;
            curentDashoffset -= sliceDonutCircuit;
            sliceDonutCircuit = donutCircuit * data;
            return (
                <circle key={index} className="donut-segment" cx="8" cy="8" r="5.73" fill="transparent" stroke={this.colors[index % this.colors.length]} strokeWidth="3" strokeDasharray={`${sliceDonutCircuit} ${donutCircuit - sliceDonutCircuit}`} strokeDashoffset={curentDashoffset}>
                    <title>{tasksDataKeys[index]}</title>
                </circle>
            )
        });

        return (
            this.data.length !== 0 && <div className="donut1">
                <svg width="216" height="216" viewBox="0 0 16 16" className="donut inline-element">
                    {this.donutSliceList}
                    <circle className="donut-hole" cx="8" cy="8" r="5.73" fill="#fff"></circle>
                    <g className="chart-text">
                        {/* //30 i 46 */}
                        <text x="40%" y="-40%" className="chart-label">
                            Tasks
                        </text>
                    </g>
                </svg>
                <div className="inline-element">
                    {this.legendList}
                </div>
            </div>
        );
    }
}

export default DonutChartSVG;