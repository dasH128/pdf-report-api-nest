import { Content } from 'pdfmake/interfaces';

interface FooterOptions {
  currentPage: number;
  pageCount: number;
  showLogo?: boolean;
  showDate?: boolean;
}

export const footerSection = (options: FooterOptions): Content => {
  const { currentPage, pageCount } = options;

  return {
    text: `Page ${currentPage} of ${pageCount} `,
    bold: true,
    fontSize: 12,
    margin: [0, 10, 35, 0],
    alignment: 'right',
  };
};
