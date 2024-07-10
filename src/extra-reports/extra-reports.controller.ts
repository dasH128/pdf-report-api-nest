import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlController(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getHtmlService();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Html-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  async getCommunityController(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getCommunityService();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Community-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size-report')
  async getCustomSizeController(@Res() response: Response) {
    const pdfDoc = await this.extraReportsService.getCustomSizeService();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom-Size-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
