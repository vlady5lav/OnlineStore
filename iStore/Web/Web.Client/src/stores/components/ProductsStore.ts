import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { IoCTypes } from '../../ioc';
import i18n from '../../locales/config';
import type { Product } from '../../models';
import type { ProductsService } from '../../services';

@injectable()
export default class ProductsStore {
  @inject(IoCTypes.productsService)
  private readonly productsService!: ProductsService;

  isLoading = false;

  products: Product[] = [];

  product: Product | null = null;

  error = '';

  queryString = '';

  totalPages = 0;

  currentPage = 1;

  pageLimit = 5;

  constructor() {
    const urlParameters = new URLSearchParams(window.location.search);
    const page = urlParameters.get('_page');
    this.currentPage = Number(page);
    makeAutoObservable(this);
  }

  public init = () => {
    this.error = '';
    this.product = null;
  };

  public getById = async (id: number): Promise<number | undefined> => {
    this.init();
    try {
      this.isLoading = true;
      const result = await this.productsService.getById(id);
      this.product = { ...result };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        this.error = error.message;
      }
    }
    this.isLoading = false;
    return this.product?.id;
  };

  public getItems = async () => {
    this.init();
    const urlParameters = new URLSearchParams(window.location.search);
    const page = urlParameters.get('_page');
    this.currentPage = page ? Number(page) : Number(1);
    try {
      this.isLoading = true;
      const result = await this.productsService.getItems({
        pageIndex: Number(this.currentPage) - 1, // numeration of pages starts from 0 on server
        pageSize: Number(this.pageLimit),
        brandIdFilter: 0,
        typeIdFilter: 0,
      });
      this.products = result.data;
      this.totalPages = result.total_pages;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.error(error.message);
      }
    }
    this.isLoading = false;
  };

  public search = async () => {
    this.init();
    try {
      this.isLoading = true;
      const id = Number(this.queryString);
      if (Number.isNaN(id)) {
        this.queryString = '';
        this.error = i18n.t('products:error.input');
        return;
      }
      const result = await this.productsService.getById(id);
      this.product = { ...result };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        this.queryString = '';
        this.error = error.message;
      }
    }
    this.queryString = '';
    this.isLoading = false;
  };

  public changePage = (page: number): void => {
    this.currentPage = page;
  };

  public changeQueryString = (query: string): void => {
    this.queryString = query;
  };
}
