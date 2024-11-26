import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { API_URIS } from 'src/common/constants/api-uris';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.schema';
import { ValidateIdPipe } from 'src/common/pipes/validate-id.pipe';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(API_URIS.PRODUCTS.BASE)
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}
    // Get all products
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Get(API_URIS.PRODUCTS.GET_ALL)
    async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.productService.findAll(paginationQueryDto);
    }

    // Get a product by ID
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Get(API_URIS.PRODUCTS.GET_BY_ID)
    async findOne(@Param('id', ValidateIdPipe) id: string) {
        return this.productService.findOne(id);
    }

    // Create a new product
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Post(API_URIS.PRODUCTS.CREATE)
    async create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: User) {
        createProductDto.createdBy = user._id.toString();
        return this.productService.create(createProductDto);
    }

    // Update a product by ID
    @Roles(UserRole.USER, UserRole.ADMIN)
    @Patch(API_URIS.PRODUCTS.UPDATE_BY_ID)
    async update(
        @Param('id', ValidateIdPipe) id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.updateOne(id, updateProductDto);
    }

    // Delete a product by ID
    @Roles(UserRole.ADMIN)
    @Delete(API_URIS.PRODUCTS.DELETE_BY_ID)
    async delete(@Param('id', ValidateIdPipe) id: string) {
        return this.productService.deleteOne(id);
    }
}
