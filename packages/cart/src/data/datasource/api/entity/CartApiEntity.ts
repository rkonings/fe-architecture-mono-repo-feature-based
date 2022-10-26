import { CartEntryApiEntity } from "./CartEntryApiEntity";

export interface CartApiEntity {
    uid: string
    isGuestCart: boolean
    entries: CartEntryApiEntity[]
}