import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from 'src/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // GET(/orders) - get all orders
  @Get('/')
  async getAllOrders() {
    return this.ordersService.getAll();
  }

  // GET(/orders/:orderId) - get order by id
  @Get('/:id')
  async getOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found!');
    return order;
  }

  // DELETE(/orders/:orderId) - delete order by id
  @Delete('/:id')
  async deleteOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id))) {
      throw new NotFoundException('Order not found!');
    }

    await this.ordersService.deleteById(id);
    return { success: true };
  }

  // POST(/orders) - post new order
  @Post('/')
  postNewOrder(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  // PUT(/orders/:orderId) - edit order by id
  @Put('/:id')
  async editExistingOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id))) {
      throw new NotFoundException('Order not found!');
    }

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
