import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

interface AssetScoreProps {
  assetScore: number;
}

function AssetHealthScore({ assetScore }: AssetScoreProps) {
  highchartsMore(Highcharts);
  solidGauge(Highcharts);

  const options = {
    chart: {
      type: "solidgauge",
      backgroundColor: null,
      spacing: [0, 0, 0, 0],
      className: "solidgaugeContainer",
    },
    title: {
      text: "Saúde do Ativo",
      align: "center",
      style: {
        fontWeight: 400,
      },
    },
    pane: {
      background: {
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    yAxis: {
      stops: [
        [0.1, "#DF5353"], // green
        [0.5, "#DDDF0D"], // yellow
        [0.9, "#55BF3B"], // red
      ],
      min: 0,
      max: 100,
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
    },
    series: [
      {
        name: "Nível de saúde",
        data: [assetScore],
        dataLabels: {
          format:
            '<span style="font-size: 40px; line-height: 0;">{y}%</span><br/>',
        },
        useHTML: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default AssetHealthScore;
