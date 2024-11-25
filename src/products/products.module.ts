import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PaginationService],
  imports: [MongooseModule.forFeature([{ name: Product.name , schema: ProductSchema }])],
})
export class ProductsModule {}
