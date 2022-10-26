import { Cart, CartEntry } from "../../domain/model";

export interface CartDomainRepository {
    getCart: () => Promise<Cart>
    addQuantity: (cartEntry: CartEntry) => Promise<Cart>
}

