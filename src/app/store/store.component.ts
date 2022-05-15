import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@app/model/product.model';
import { ProductRepository } from '@app/model/product.repository';
import { STORE_PAGE_CONFIG } from './store.const';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'store',
    // moduleId: module.id,
    templateUrl: 'store.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreComponent implements OnInit {
    public selectedCategory: string | null = null;
    public productsPerPage = STORE_PAGE_CONFIG.productsPerPage;
    public selectedPage = 1;
    public productsList = [] as Product[];
    public productCategoriesList: string[] = [];

    constructor(private repository: ProductRepository, protected cdr: ChangeDetectorRef) {}

    getProducts(): void {
        const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        this.productsList = this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage);
    }

    getCategories(): void {
        this.productCategoriesList = this.repository.getCategories();
    }

    get products(): Product[] {
        return this.productsList;
    }

    get categories(): string[] {
        return this.productCategoriesList;
    }

    changeCategory(newCategory: string | null = null): void {
        this.selectedCategory = newCategory;
        this.getProducts();
        this.cdr.detectChanges();
    }

    changePage(newPage: number): void {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number): void {
        this.productsPerPage = newSize;
        this.changePage(1);
    }

    get pageNumbers(): number[] {
        return Array(Math.ceil(this.productsList.length / this.productsPerPage)).fill(0).map((item, index) => index + 1);
    }

    ngOnInit(): void {
        this.productCategoriesList = this.repository.getCategories();
        this.getProducts();
        this.getCategories();
    }
}