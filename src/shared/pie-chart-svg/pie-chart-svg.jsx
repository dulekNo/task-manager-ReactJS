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

  

init() {

    this.paper;
    this.arc;
    // this.colorArr = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];
    // this.pieData = [113, 100, 50, 28, 27];
    this.sectorAngleArr = [];
    // this.total = 0;
    this.startAngle = 0;
    this.endAngle = 0;
    // this.x1, x2, y1, y2 = 0;
    this.points =[];

    // this.paper = Raphael("holder");
    //CALCULATE THE TOTAL
    // for (var k = 0; k < pieData.length; k++) {
    //     total += pieData[k];
    // }
    //CALCULATE THE ANGLES THAT EACH SECTOR SWIPES AND STORE IN AN ARRAY
    for (var i = 0; i < this.data.length; i++) {
        var angle = Math.ceil(360 * this.data[i]);
        this.sectorAngleArr.push(angle);
    }
    // drawArcs();
}

// drawArcs() {
//     for (var i = 0; i < sectorAngleArr.length; i++) {
//         startAngle = endAngle;
//         endAngle = startAngle + sectorAngleArr[i];

//         x1 = parseInt(200 + 180 * Math.cos(Math.PI * startAngle / 180));
//         y1 = parseInt(200 + 180 * Math.sin(Math.PI * startAngle / 180));

//         x2 = parseInt(200 + 180 * Math.cos(Math.PI * endAngle / 180));
//         y2 = parseInt(200 + 180 * Math.sin(Math.PI * endAngle / 180));

//         var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise
//         alert(d);
//         arc = paper.path(d);
//         arc.attr("fill", colorArr[i]);
//     }
// }

render() {
    this.copyOfListOfTasks = this.props.listOfTasks;
    this.data = [];
    this.colors = [];
    this.totalTasksQuentity = this.copyOfListOfTasks.length;
    this.countDataForChart();
    // this.drawPieChart();

    let tasksDataKeys = Object.keys(this.tasksData);
    let index = -1;
    this.dataLegent = [];
    for (let ele in this.data) {
        this.dataLegent.push(Math.round(this.data[ele] * 10000) / 100);
    }
    this.legendList = this.dataLegent.map((data) => {
        index++;
        return (
            <div key={index}>
                <div className="shape-circle shape-fuschia inlineElement" style={{ backgroundColor: this.colors[index % this.colors.length] }}>
                </div>
                <span className="inlineElement legentTextMargin">{tasksDataKeys[index]} ({data}%)</span>
            </div>
        )
    });

    index = -1;
    let donutCircuit = 36;
    let sliceDonutCircuit = 0;
    let curentDashoffset = 0;

    let startAngle = 0;
    let endAngle = 0;
    let x1=0,y1=0,x2=0,y2 =0;

    this.sectorAngleArr =[];
    for (var i = 0; i < this.data.length; i++) {
        var angle = Math.ceil(360 * this.data[i]);
        this.sectorAngleArr.push(angle);
    }
    this.sectorAngleArr2 = this.sectorAngleArr.map((data, index) => {
    // for (var i = 0; i < sectorAngleArr.length; i++) {
        startAngle = endAngle;
        endAngle = startAngle + data;

        x1 = parseInt(200 + 180 * Math.cos(Math.PI * startAngle / 180), 10);
        y1 = parseInt(200 + 180 * Math.sin(Math.PI * startAngle / 180), 10);

        x2 = parseInt(200 + 180 * Math.cos(Math.PI * endAngle / 180), 10);
        y2 = parseInt(200 + 180 * Math.sin(Math.PI * endAngle / 180), 10);

        // var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise
        // alert(d);
        // arc = thispaper.path(d);
        // arc.attr("fill", colorArr[i]);
        // this.colors[index % this.colors.length]
        return (
            <path key={index} fill="#61C0BF" d={`M200,200  L${x1},${y1} A180,180 0 0,1${x2},${y2} z`}></path>
        );
    });


    // this.data.splice(1,1)
    this.donutSliceList = this.data.map((data) => {
        index++;
        curentDashoffset -= sliceDonutCircuit;
        sliceDonutCircuit = donutCircuit * data;
        return (
            <circle key={index} className="donut-segment" cx="8" cy="8" r="5.73" fill="transparent" stroke={this.colors[index % this.colors.length]} strokeWidth="3" strokeDasharray={`${sliceDonutCircuit} ${donutCircuit - sliceDonutCircuit}`} strokeDashoffset={curentDashoffset}>
                <title id="donut-segment-1-title">{tasksDataKeys[index]}</title>
            </circle>
        )

    });

    return (
        <div className="erwqe">
            {/* <svg width="216" height="216" >
                <path fill="#61C0BF" d="M300 300 A 180 180 0 0 1 89 99 L 0 0"></path>
            </svg> */}
            <svg width="600" height="400">
                    {this.sectorAngleArr2}
                </svg>
            <div className="inlineElement circleLegend">
                {this.legendList}
            </div>
        </div>
    );
}
}

export default PieChartSVG;