import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getOrderByIdReport } from 'src/reports';

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
}
