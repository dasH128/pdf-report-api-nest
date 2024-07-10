import { Module } from '@nestjs/common';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { ExtraReportsModule } from './extra-reports/extra-reports.module';

@Module({
  imports: [BasicReportModule, PrinterModule, StoreReportsModule, ExtraReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
