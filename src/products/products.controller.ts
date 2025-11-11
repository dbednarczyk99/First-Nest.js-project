import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // GET(/products) - get all products
  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  // GET(/products/:productId) - get product by id
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  // DELETE(/products/:productId) - delete product by id
  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    this.productsService.deleteById(id);
    return { success: true };
  }

  // POST(/products) - post new product
  @Post('/')
  postNewProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
