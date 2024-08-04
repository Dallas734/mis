import { Order } from "./Order";

export interface TableColumn {
    index: string,
    name: string,
    sortMethod?: Order
}