import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { Response } from 'express';

@Controller('basic-report')
export class BasicReportController {
  constructor(private readonly basicReportService: BasicReportService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
