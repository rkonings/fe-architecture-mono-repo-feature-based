import { CartEntry } from '../../domain/model'
import { cartDatasource } from "../../data/datasource";
import { cartDataRespository } from "../../data/repository"

export function addQuantity(cartEntry:CartEntry){
    const cartRespository = cartDataRespository(cartDatasource)
    return cartRespository.addQuantity(cartEntry)
}