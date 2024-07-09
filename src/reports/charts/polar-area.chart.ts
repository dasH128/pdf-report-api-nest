import * as Utils from 'src/helpers/chart-utils';

interface PolarEntry {
  label: string;
  value: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  entries: PolarEntry[];
}

const _valueMax = (values: number[]): number => {
  return Math.max(...values);
};
export const getPolarAreaChart = async (options: ReportOptions) => {
  const { entries } = options;
  const {} = entries;
  const DATA_COUNT = entries.length;

  const NUMBER_CFG = {
    count: DATA_COUNT,
    min: 0,
    max: _valueMax(entries.map((e) => e.value)),
  };

  const backgroundColorArray = [];
  entries.forEach((_, i) => {
    backgroundColorArray.push(Utils.transparentize(Utils.CHART_COLORS[i], 0.8));
  });
  const data = {
    labels: entries.map((e) => `${e.value} ${e.label}`),
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: backgroundColorArray,
      },
    ],
  };

  const config = {
    type: 'polarArea',
    data: data,
    // options: {
    //   responsive: true,
    //   scales: {
    //     r: {
    //       pointLabels: {
    //         display: true,
    //         centerPointLabels: true,
    //         font: {
    //           size: 18,
    //         },
    //       },
    //     },
    //   },
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     },
    //     title: {
    //       display: true,
    //       text: 'Chart.js Polar Area Chart With Centered Point Labels',
    //     },
    //   },
    // },
  };
  return Utils.chartJsToImage(config);
};
