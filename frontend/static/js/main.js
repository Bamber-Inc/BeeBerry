define(["jquery", "highcharts", "socketio"], function($, Highcharts, io) {
  $(document).ready(function() {
    var chart = new Highcharts.Chart({
      chart: {
        zoomType: "xy",
        margin: [80, 80, 80, 80],
        renderTo: "container"
      },
      title: {
        text: "CPU Load Average & Memory Usage"
        text: "Current Bee hive STATS"
      },
      subtitle: {
        text: "Plotting outside and inside temperture with humidity info in real-time using websockets."
      },
      xAxis: {
        gridLineWidth: 5,
        maxZoom: 60
      },
      yAxis: [
        {
          title: {
            text: "Humidity %age"
          },
          min: 0,
          max: 100,
          plotLines: [
            {
              value: 0,
              width: 1,
              colour: "#8088f0"
            }
          ],
          opposite: true
        },
        {
          title: {
            text: "Temperture"
          },
          min: 10,
          plotLines: [
            {
              value: 0,
              width: 1,
              colour: "#ff0000",
              zIndex: 0
            }
          ]
        }
      ],
      plotOptions: {
        column: {
          pointPadding: 0,
          groupPadding: 0
        }
      },
      series: [
        {
          name: "Humidity",
          type: "column",
          color: "#9400D3",
          grouping: false,
          yAxis: 0,
          data: []
        },
        {
          name: "Inside Temp",
          type: "spline",
          yAxis: 1,
          data: []
        }
      ]
    });

    var socket = io.connect(
      window.location.protocol + "//" + window.location.hostname
    );

    socket.on("loadavg", data => {
      var series = chart.series[1];
      series.addPoint([data.onemin], true, series.data.length > 100);
    });
    socket.on("memory", data => {
      var series = chart.series[0];
      series.addPoint([data.used], true, series.data.length > 100);
    });
  });
});
