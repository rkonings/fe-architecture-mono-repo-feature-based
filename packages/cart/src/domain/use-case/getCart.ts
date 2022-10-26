import { cartDatasource } from "../../data/datasource";
import { cartDataRespository } from "../../data/repository";

export function getCart(){
    const cartRespository = cartDataRespository(cartDatasource)
    return cartRespository.getCart()
}