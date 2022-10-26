export interface CartEntryApiEntity {
    sku: string;
    product: {
        name: string
    }
    quantity: number;

}