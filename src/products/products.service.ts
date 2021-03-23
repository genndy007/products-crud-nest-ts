import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    };

    getProducts() {
        return [...this.products];
    };

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return { ...product };
    };

    updateProduct(
        prodId: string,
        title: string,
        desc: string,
        price: number
    ) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.desc = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    };

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(prodId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === prodId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}