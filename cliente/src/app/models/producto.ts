export class Producto{
    _id?: number;
    nombre: string;
    categoria: string;
    imagen: File;
    precio: number;
    
    constructor(nombre: string, categoria: string, imagen: File, precio: number){
        this.nombre = nombre;
        this.categoria = categoria;
        this.imagen = imagen;
        this.precio = precio;

    }
}