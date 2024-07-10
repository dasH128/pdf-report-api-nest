import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlService() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf-8');
    const content = getHtmlContent(html, {
      client: 'Jordy Rojas',
      title: 'Titulo Personalisado',
    });
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir Html a PDFMake',
      }),
      content: content,
    };
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCommunityService() {
    const docDefinition = getCommunityReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCustomSizeService() {
    const doc = this.printerService.createPdf({
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        {
          qr: 'https://www.linkedin.com/in/dash128/',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Report con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });
    return doc;
  }
}
