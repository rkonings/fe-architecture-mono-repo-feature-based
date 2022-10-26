import { getCart, addQuantity } from "../domain/use-case"

export function cartViewModel() {
    return {
        getCart,
        addQuantity,
    }
}