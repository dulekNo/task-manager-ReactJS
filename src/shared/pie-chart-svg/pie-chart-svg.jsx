import React from 'react';
import PropTypes from 'prop-types';
import './pie-chart-svg.css';

class PieChartSVG extends React.Component {

    static propTypes = {
        listOfTasks: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.colorsForData = [];
        this.taskDone = '#beff58';
        this.taskInProgress = '#53ffe5';
        this.taskTodo = '#f0f1e3';
        this.position = {};
        this.width = 230;
        this.state = {
            tooltipWidth: 0,
            selectedSlice: ''
        };
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

        this.dataPercentage = [];
        this.totalTasksQuentity = this.copyOfListOfTasks.length;
        for (let ele in this.tasksData) {
            this.dataPercentage.push(this.tasksData[ele] / this.totalTasksQuentity);
        }

        for (var i = 0; i < this.dataPercentage.length; i++) {
            var angle = Math.ceil(360 * this.dataPercentage[i]);
            this.sectorAngleArr.push(angle);
        }
    }

    dummyOnClickFun(e, data) {
        e.preventDefault();
        console.log(e);
        console.log(data);
    }

    showTooltip(e, x, y, sliceName) {
        this.setState({
            selectedSlice: sliceName
        }, () => {
            this.tmp = this.tooltip.clientWidth / 2;

            this.setState({
                tooltipWidth: this.tooltip.clientWidth
            });
        })
    }

    drawPieCHart() {
        let startAngle = 0;
        let endAngle = 0;
        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        let radius = this.width / 2;
        this.svgChartPiece = this.sectorAngleArr.map((data, index) => {
            startAngle = endAngle;
            endAngle = startAngle + data;

            x1 = radius + radius * Math.cos(Math.PI * startAngle / 180);
            y1 = radius + radius * Math.sin(Math.PI * startAngle / 180);

            x2 = radius + radius * Math.cos(Math.PI * endAngle / 180);
            y2 = radius + radius * Math.sin(Math.PI * endAngle / 180);


            let positionX = radius + radius * Math.cos(Math.PI * (startAngle + data / 2) / 180);
            let positionY = radius + radius * Math.sin(Math.PI * (startAngle + data / 2) / 180);

            this.position[this.tasksDataKeys[index]] = [positionY - 30, positionX];
            return (
                <path
                    key={index}
                    className="clickable-slice"
                    onMouseEnter={this.handleHover}
                    onMouseOver={(e) => { this.showTooltip(e, x2, y2, this.tasksDataKeys[index]) }}
                    onClick={(e) => { this.dummyOnClickFun(e, data) }}
                    fill={this.colors[index % this.colors.length]}
                    d={`M${radius},${radius}  L${x1},${y1} A${radius},${radius} 0 ${(endAngle - startAngle > 180) ? 1 : 0},1${x2},${y2} z`}>
                </path>
            );
        });
    }

    drawLegend() {

        let index = -1;
        this.dataLegent = [];
        for (let ele in this.dataPercentage) {
            this.dataLegent.push(Math.round(this.dataPercentage[ele] * 10000) / 100);
        }
        this.legendList = this.dataLegent.map((data) => {
            index++;
            return (
                <div key={index}>
                    <div className="shape-circle shape-fuschia inline-element" style={{ backgroundColor: this.colors[index % this.colors.length] }}>
                    </div>
                    <span className="inline-element legent-text-margin">{this.tasksDataKeys[index]} ({data}%)</span>
                </div>
            )
        });
    }

    render() {
        this.copyOfListOfTasks = this.props.listOfTasks;
        this.dataPercentage = [];
        this.colors = [];
        this.totalTasksQuentity = this.copyOfListOfTasks.length;
        this.sectorAngleArr = [];
        
        this.tooltip = '';
        this.countDataForChart();
        this.tasksDataKeys = Object.keys(this.tasksData);
        this.drawPieCHart();
        this.drawLegend();

        let tooltioStyle = '';
        if (this.state.selectedSlice !== '') {
            tooltioStyle = {
                top: this.position[this.state.selectedSlice][0] + 'px',
                left: this.position[this.state.selectedSlice][1] - Math.floor(this.state.tooltipWidth / 2) + 'px',
            }
        }

        return (
            this.copyOfListOfTasks.length !== 0 && <div className="position-relative">
                <svg width={this.width} height={this.width} className="svg-pie-chart">
                    <g className="svg-pie-chart-g">
                        <path fill="#ffffff" d={`M${this.width / 2} ${this.width / 2} m -${this.width / 2}, 0 a ${this.width / 2},${this.width / 2} 0 1,1 ${this.width},0 a ${this.width / 2},${this.width / 2} 0 1,1 -${this.width},0 `} />
                        {this.svgChartPiece}
                    </g>
                </svg>
                <div className="inline-element">
                    {this.legendList}
                </div>
                {this.state.selectedSlice !== '' && <div className="tooltip-pie-chart"
                    style={tooltioStyle}
                    ref={(tooltip) => { this.tooltip = tooltip; }}
                >
                    {this.state.selectedSlice}: <span className="text-red">{this.tasksData[this.state.selectedSlice]}</span>
                </div>}
            </div>
        );
    }
}

export default PieChartSVG;