import { Module } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { BasicReportController } from './basic-report.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [BasicReportController],
  providers: [BasicReportService],
  imports: [PrinterModule],
})
export class BasicReportModule {}
