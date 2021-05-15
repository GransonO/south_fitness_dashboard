import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class StackedColumnChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "15%",
            // endingShape: "rounded",
          },
        },

        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        colors: ["#00CD00", "#FF0000", "#0000FF"],
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
      series: [
        {
          name: "Safaricom PLC",
          data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
        },
        {
          name: "Bata Shoe Company",
          data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
        },
        {
          name: "Centum Group",
          data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
        },
      ],
    }
  }

  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="359"
        />
      </React.Fragment>
    )
  }
}

export default StackedColumnChart
