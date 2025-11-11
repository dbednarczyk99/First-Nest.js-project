import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // GET(/orders) - get all orders
  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  // GET(/orders/:orderId) - get order by id
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.ordersService.getById(id);
  }
}
