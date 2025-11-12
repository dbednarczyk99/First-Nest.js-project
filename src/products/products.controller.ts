import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dtos/create-product.dto';
import { UpdateProductDTO } from 'src/dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // GET(/products) - get all products
  @Get('/')
  getAllProducts(): any {
    return this.productsService.getAll();
  }

  // GET(/products/:productId) - get product by id
  @Get('/:id')
  getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException('Product not found!');
    }

    return this.productsService.getById(id);
  }

  // DELETE(/products/:productId) - delete product by id
  @Delete('/:id')
  deleteProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException('Product not found!');
    }

    this.productsService.deleteById(id);
    return { success: true };
  }

  // POST(/products) - post new product
  @Post('/')
  postNewProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  // PUT(/products/:productId) - edit product by id
  @Put('/:id')
  editExistingProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException('Product not found!');
    }

    this.productsService.updateById(id, productData);
    return { success: true };
  }
}
