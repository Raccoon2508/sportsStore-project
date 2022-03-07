import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category).filter((item, index, array) => array.indexOf(item) === index).sort() as string[];
        })
    }

    getProducts(category: string | null = null): Product[] {
        return this.products.filter(product => category === null || category === product.category);
    }

    getProduct(id: number): Product {
        return this.products.find(product => product.id === id) as Product;
    }

    getCategories(): string[] {
        return this.categories;
    }
}