import { Module } from '@nestjs/common';
import { BasicReportModule } from './basic-report/basic-report.module';

@Module({
  imports: [BasicReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
