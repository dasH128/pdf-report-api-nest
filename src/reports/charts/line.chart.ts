import * as Utils from 'src/helpers/chart-utils';

export const getLineChart = async () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimientos de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
        pointStyle: 'circle',
        pointRadius: 10,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    // options: {
    //   responsive: true,
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: (ctx) =>
    //         'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
    //     },
    //   },
    // },
  };

  return Utils.chartJsToImage(config, { width: 500, height: 200 });
};
