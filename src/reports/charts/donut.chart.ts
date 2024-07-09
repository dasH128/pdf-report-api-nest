import * as Utils from 'src/helpers/chart-utils';
interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  position?: 'left' | 'right' | 'top' | 'bottom';
  entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions) => {
  const { position = 'top' } = options;

  const data = {
    labels: options.entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((entry) => entry.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: position,
      },
      plugins: {
        datalabels: {
          //   display: true,
          //   text: 'Chart.js Doughnut Chart',
          color: 'white',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
