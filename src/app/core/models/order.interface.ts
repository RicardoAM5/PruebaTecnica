import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Order {
    idOrden: number;
    usuario: User;
    producto: Product;
    cantidad: number;
    preciounitario: number;
    fecha: Date;
    }