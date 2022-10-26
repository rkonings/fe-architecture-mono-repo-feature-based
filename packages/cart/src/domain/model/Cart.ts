import { CartEntry } from "./CartEntry";

export interface Cart {
    uid: string;
    entries: CartEntry[]
}

export const Cart = {
    isEmpty: function (cart: Cart){
        return cart.entries.length === 0
    },
    
    // price: function(cart: Cart){
    //     return cart.entries.reduce((cartPrice, cartEntry) => 
    //         cartPrice + cartEntry.price
    //     , 0)
    // }
}
    