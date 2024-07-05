import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, continents } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorlReport,
} from 'src/reports';

@Injectable()
export class BasicReportService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async hello() {
    const docDefinition = getHelloWorlReport({ name: 'Jordy Rojas' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Jordy Rojas',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: { local_name: { not: null } },
    });
    const docDefinition = getCountriesReport({ countries: countries });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountriesByContinent(continent: continents) {
    const countries = await this.countries.findMany({
      where: { continent: continent },
    });
    if (!countries) {
      throw new NotFoundException(`Contry  ${countries} not exist`);
    }
    const docDefinition = getCountriesReport({ countries: countries });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
