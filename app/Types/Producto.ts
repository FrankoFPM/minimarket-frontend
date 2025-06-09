export interface ProductoBase {
  idProducto: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  foto: string;
  estado: string;
}

export interface ProductoCategoria {
  categoriaNombre: string;
  idCategoria?: number;
}

export interface ProductoProveedor {
  proveedorNombre: string;
  idProveedor?: number;
}

export interface ProductoTimestamps {
  createdAt?: string;
  updatedAt?: string;
}

export type Producto = ProductoBase & ProductoCategoria & ProductoProveedor & ProductoTimestamps;