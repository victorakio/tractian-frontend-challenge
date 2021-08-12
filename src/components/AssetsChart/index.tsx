import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface AssetsChartProps {
  status: string[];
  quantities: number[];
}

function AssetsChart({ status, quantities }: AssetsChartProps) {
  const assetStatus = [
    {
      name: status[0],
      y: quantities[0],
      color: "#00ad00",
    },
    {
      name: status[1],
      y: quantities[1],
      color: "#999999",
    },
    {
      name: status[2],
      y: quantities[2],
      color: "#9b0000",
    },
  ];

  const options = {
    chart: {
      type: "pie",
      backgroundColor: null,
      width: 400,
    },
    title: {
      text: "Status dos Ativos",
    },
    series: [
      {
        name: "Quantidade",
        colorByPoint: true,
        data: assetStatus,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default AssetsChart;
