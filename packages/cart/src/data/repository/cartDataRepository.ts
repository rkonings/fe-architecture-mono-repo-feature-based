import { CartDataSource } from "../../data/datasource";
import { CartDomainRepository } from "../../domain";
import { CartEntry } from "../../domain/model";

export function cartDataRespository(datasource: CartDataSource): CartDomainRepository {
    return {
        getCart: async function() { return datasource.getCart() },
        addQuantity: async function(cartEntry: CartEntry) { return datasource.addQuantity(cartEntry.sku) }
    }
}