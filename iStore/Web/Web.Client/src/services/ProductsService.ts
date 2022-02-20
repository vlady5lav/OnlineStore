import 'reflect-metadata';

import { inject, injectable } from 'inversify';

import type { PaginatedItemsDto, PaginatedItemsRequest, PaginatedItemsResponse, ProductDto } from '../dtos';
import { IoCTypes } from '../ioc';
import type { Product } from '../models';
import { ContentType, HttpService, MethodType } from './HttpService';

export interface ProductsService {
  getById(id: number): Promise<Product>;
  getItems(request: PaginatedItemsRequest): Promise<PaginatedItemsResponse>;
}

@injectable()
export default class DefaultProductsService implements ProductsService {
  @inject(IoCTypes.httpService)
  private readonly httpService!: HttpService;

  public async getById(id: number): Promise<Product> {
    const result = await this.httpService.sendAsync<ProductDto>(
      `api/v1/CatalogBff/GetCatalogItemById?id=${id}`,
      MethodType.POST
    );
    return result.data;
  }

  public async getItems(request: PaginatedItemsRequest): Promise<PaginatedItemsResponse> {
    const result = await this.httpService.sendAsync<PaginatedItemsDto>(
      'api/v1/CatalogBff/GetCatalogItems/',
      MethodType.POST,
      { contentType: ContentType.Json },
      request
    );
    const data = result.data.data;
    const total_pages = Math.ceil(Number(result.data.count) / Number(request.pageSize));
    return { data: data, total_pages: total_pages };
  }
}
