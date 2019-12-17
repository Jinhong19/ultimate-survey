import React from 'react';
import Chart from 'chart.js';
class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }

    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'bar',
        options: {
            maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.data.map(d => d.label),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            backgroundColor: this.props.color
          }]
        }
      });
    }
  
    render() {
      return (
          this.myChart,
          <canvas ref={this.canvasRef} />
      );
    }
  }

  export default BarChart