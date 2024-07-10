import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  data?: CompleteOrder;
}

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  // alignment: 'center',
  margin: [0, 30, 0, 0],
};

const styles: StyleDictionary = {
  header: { fontSize: 20, bold: true },
  subHeader: { fontSize: 16, bold: true, margin: [0, 20, 0, 0] },
};

export const getOrderByIdReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { customers, order_details, order_id, order_date } = options.data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );
  const docDefinition: TDocumentDefinitions = {
    styles: styles,
    header: logo,
    footer: function (currentPage, pageCount) {
      return footerSection({ currentPage, pageCount });
    },
    pageMargins: [40, 60, 40, 60],
    content: [
      { text: 'Tucan Code', style: 'header' },
      {
        columns: [
          {
            text: '15 Mongomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\n http:devtalles.com',
            alignment: 'left',
          },
          {
            text: [
              { text: `Recibo N#${order_id}\n`, bold: true },
              `Fecha de recibo: ${DateFormatter.getDDMMMMYYYY(order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
      },
      {
        qr: 'https://www.linkedin.com/in/dash128/',
        fit: 75,
        alignment: 'right',
      },
      {
        text: [
          {
            text: `Cobrar a\n`,
            bold: true,
            style: 'subHeader',
          },
          `Razón Social: ${customers.customer_name}
            ${customers.contact_name}`,
        ],
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((od) => {
              const { order_detail_id, products, quantity } = od;

              return [
                order_detail_id,
                `${products.product_name} ${products.unit}`,
                quantity.toString(),
                {
                  text: CurrencyFormatter.formatCurrency(+products.price),
                  alignment: 'right',
                },
                {
                  text: CurrencyFormatter.formatCurrency(
                    +products.price * quantity,
                  ),
                  alignment: 'right',
                },
              ];
            }),
          ],
        },
      },
      '\n\n',
      {
        columns: [
          { width: '*', text: '' },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal * 1.15),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
  return docDefinition;
};
