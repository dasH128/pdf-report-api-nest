import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { Response } from 'express';
import { ContinentEnumDto } from 'src/dto/continent-enum.dto';

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

  @Get('contries')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportService.getCountries();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries- Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('contries/continent/:continent')
  async getCountriesByContinent(
    @Res() response: Response,
    @Param() continentEnum: ContinentEnumDto,
  ) {
    const pdfDoc = await this.basicReportService.getCountriesByContinent(
      continentEnum.continent,
    );

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = `Countries of ${continentEnum.continent} - Report`;
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
