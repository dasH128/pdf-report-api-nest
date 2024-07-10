import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: { fontSize: 10 },
    content: [
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            text: 'Forest admin Community SAP\nRUT: 44.123.1233Camino montaña Km14\nTeléfono: 322-322322',
            alignment: 'center',
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'borderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No:', '123-456'],
                        ['Fecha:', '2021-21-04'],
                        ['Version:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4556',
          },
        ],
      },
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos del cliente',
                fillColor: '#5775E1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],
            [
              {
                text: 'Razón Social',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Nombre de la Empresa',
                fillColor: 'white',
              },
              {
                text: 'Dirección',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Calle falsa 123',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Teléfono',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Condición de pago',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
