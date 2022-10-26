import { Cart, CartEntry } from "../../domain/model";
import { config } from '@rkonings/shared'
import { CartEntryApiEntity } from "./api/entity/CartEntryApiEntity";

export interface CartDataSource {
    getCart(): Promise<Cart>;
    addQuantity(cartEntrySku: CartEntry['sku']): Promise<Cart>;
}

export const cartDatasource: CartDataSource = {
    getCart: async function() {
        // let response = await fetch(`${config.baseUrl}/cart`);
        // let data = await response.json();
        // return data;
        const url = "https://kassa.acceptatie.gamma.nl/api/v2/cart"
        const response = await fetch(url);
        const data = await response.json();
        return data
    },
    
    addQuantity: async function(cartEntrySku: CartEntryApiEntity['sku']) {
        let response = await fetch(`${config.baseUrl}/cart/${cartEntrySku}`);
        let data = await response.json();
        return data;
    }
}