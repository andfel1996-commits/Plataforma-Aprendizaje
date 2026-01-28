class Producto {
    constructor(nombre,precio,categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
    mostrarInfo() {
        return `Nombre: ${this.nombre}, Precio: ${this.precio}, Categoria: ${this.categoria}`;

    }

 }
class ProductoElectronico extends Producto {
    constructor(nombre,precio,categoria,marca) {
    super(nombre,precio,categoria)
    this.marca = marca;

    }
    mostrarInfoCompleta(){
        
        return`${this.mostrarInfo()},Marca:${this.marca}`
    }
}
Producto.prototype.precioConDescuento = function(descuento){
    return this.precio -(this.precio*descuento/100);
};
const catalogo ={
    Productos:[
        new Producto(`Camiseta`,`300`, `Ropa`),
        new Producto(`Pantalon`,`500`, `Ropa`),
        new ProductoElectronico(`Smartphone`,`1000`,`Electronica`,`Motorola`),
        new ProductoElectronico(`Laptop`,`1500`,`Electronica`,`Toshiba`)
    ]

};
const catalogoJSON=JSON.stringify(catalogo)
console.log(catalogoJSON);
const catalogoDeNuevo=JSON.parse(catalogoJSON);
console.log(catalogoDeNuevo);