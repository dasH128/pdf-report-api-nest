import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarChart } from './charts/bar.chart';
import { getPolarAreaChart } from './charts/polar-area.chart';

interface TopCountry {
  country: string;
  customers: number;
}
interface InfoCategory {
  category: string;
  total: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
  infoCategories: InfoCategory[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  //   const donutChart = await generateTopCountryDonut(options.topCountries);

  const [donutChart, lineChart, barChart1, polarChart] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((c) => ({
        label: c.country,
        value: c.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
    getBarChart(),
    getPolarAreaChart({
      entries: options.infoCategories.map((ic) => ({
        label: ic.category,
        value: ic.total,
      })),
    }),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de clientes',
      subTitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Mejores 10 países con más clientes',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              { image: donutChart, width: 320 },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['País', 'Clientes'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          { image: barChart1, width: 250 },
          { image: polarChart, width: 250 },
        ],
      },
    ],
  };

  return docDefinition;
};
