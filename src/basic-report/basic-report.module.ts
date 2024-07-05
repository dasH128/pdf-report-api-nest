import { Module } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { BasicReportController } from './basic-report.controller';

@Module({
  controllers: [BasicReportController],
  providers: [BasicReportService],
})
export class BasicReportModule {}
