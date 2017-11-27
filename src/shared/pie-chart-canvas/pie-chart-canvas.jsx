import React from 'react';
import PropTypes from 'prop-types';
import './pie-chart-canvas.css';

class PieChartCanvas extends React.Component {

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

    componentDidMount() {
        this.updateCanvas();
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
            this.data.push(Math.round(this.tasksData[ele] / this.totalTasksQuentity * 10000) / 100);
        }

    }

    drawPieChart() {
        const ctx = this.refs.myCanvas;

        if (ctx) {
            this.piechart({
                canvas: ctx,
                data: this.tasksData,
                colors: this.colors,
                total_value: this.totalTasksQuentity
            });
        }
    }
    updateCanvas() {
        const ctx = this.refs.myCanvas.getContext('2d');
        // this.drawLine(ctx, 100, 100, 200, 15);
        // this.drawArc(ctx, 100, 100, 50, 200, 15);
        // this.drawPieSlice(ctx, 100, 100, 50, 200, 15, '#ff0000');
        ctx.fillStyle = 'rgb(100,0,0)';
        ctx.fillRect(50, 50, 130, 100);

    }
    drawLine(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
    }

    drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }

    piechart(options) {
        let canvas = options.canvas;
        let ctx = canvas.getContext("2d");
        let colors = options.colors;
        let total_value = options.total_value;

        //clear filed for piechart
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        let color_index = 0;
        let val;
        let slice_angle;
        let start_angle = 0;

        for (let categ in options.data) {
            val = options.data[categ];
            slice_angle = 2 * Math.PI * (val / total_value);

            // data on piechart
            // var pieRadius = Math.min(canvas.width / 2, canvas.height / 2);
            // var labelX = canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
            // var labelY = canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);


            this.drawPieSlice(
                ctx,
                canvas.width / 2,
                canvas.height / 2,
                Math.min(canvas.width / 2, canvas.height / 2),
                start_angle,
                start_angle + slice_angle,
                colors[color_index % colors.length]
            );


            //does not work as i want to (each slice separetly...)
            // canvas.addEventListener('mouseover', function () {
            //     //data on piechart
            //     var labelText = Math.round(100 * val / total_value);
            //     ctx.fillStyle = "black";
            //     ctx.font = "bold 20px Arial";
            //     ctx.fillText(labelText + "%", labelX, labelY);
            // }, false);


            start_angle += slice_angle;
            color_index++;
        }
    }

    render() {
        this.copyOfListOfTasks = this.props.listOfTasks;
        this.data = [];
        this.colors = [];
        this.totalTasksQuentity = this.copyOfListOfTasks.length;
        this.countDataForChart();
        this.drawPieChart();

        let tasksDataKeys = Object.keys(this.tasksData);
        let index = -1;
        console.log(tasksDataKeys);
        console.log(this.data);
        this.legendList = this.data.map((data) => {
            index++;
            return (
                <div key={index}>
                    <div className="singleLegend inlineElement" style={{ backgroundColor: this.colors[index % this.colors.length] }}>
                        {data}%
                    </div>
                    <span className="inlineElement legentTextMargin">{tasksDataKeys[index]}</span>
                </div>
            )
        });

        return (
            <div>
                <canvas ref="myCanvas" width={230} height={230} ></canvas>
                <div className="inlineElement">
                    {this.legendList}
                </div>
            </div>

        );
    }
}

export default PieChartCanvas;