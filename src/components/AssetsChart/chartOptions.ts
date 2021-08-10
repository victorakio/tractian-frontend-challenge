export const options = {
  chart: {
    type: "pie",
    width: 400,
  },
  title: {
    text: "Status dos Ativos",
  },
  series: [
    {
      name: "Quantidade",
      colorByPoint: true,
      data: [
        {
          name: "Ativo",
          y: 3,
          color: "#00ad00",
        },
        {
          name: "Em parada",
          y: 2,
          color: "#999999",
        },
        {
          name: "Alerta",
          y: 4,
          color: "#9b0000",
        },
      ],
    },
  ],
};
