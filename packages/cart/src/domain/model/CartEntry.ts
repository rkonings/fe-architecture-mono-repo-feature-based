export interface CartEntry {
    sku: string;
    product: { name: string; }
    quantity: number;
}