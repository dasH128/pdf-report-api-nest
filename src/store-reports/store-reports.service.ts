import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicChartSvgReport,
  getOrderByIdReport,
  getStatisticsReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('connected to the database-StoreReportsService');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdService(orderId: number): Promise<PDFKit.PDFDocument> {
    const order = await this.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customers: true,
        order_details: { include: { products: true } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const docDefinition = getOrderByIdReport({ data: order as any });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getSvgChartService(): Promise<PDFKit.PDFDocument> {
    const docDefinition = await getBasicChartSvgReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getStatisticsService(): Promise<PDFKit.PDFDocument> {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    });

    const infoCategories = (await this.$queryRaw`
    SELECT
      COUNT(*) AS TOTAL,
      C.CATEGORY_NAME
    FROM
      PRODUCTS P
      INNER JOIN CATEGORIES C ON P.CATEGORY_ID = C.CATEGORY_ID
    GROUP BY
      P.CATEGORY_ID, C.CATEGORY_NAME`) as any;

    const topCountryData = topCountries.map((country) => ({
      country: country.country,
      customers: country._count,
    }));
    const infoCategoryData = infoCategories.map((category) => ({
      total: Number(category.total),
      category: category.category_name,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData,
      infoCategories: infoCategoryData,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
