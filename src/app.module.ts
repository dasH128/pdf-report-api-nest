import { Module } from '@nestjs/common';
import { BasicReportModule } from './basic-report/basic-report.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [BasicReportModule, PrinterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
