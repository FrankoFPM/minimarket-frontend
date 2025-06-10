export interface UserId {
  id: string;
}

export interface UserNombre {
  nombre: string;
  apellido: string;
}

export interface UserContacto {
  email: string;
  telefono: string;
  direccion: string;
}

export interface UserDistrito {
  distritoId: number;
  distritoNombre: string;
  direccion: string;
}

export interface UserPassword {
  password: string;
}

export enum RolUsuario {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
  ALMACENISTA = 'almacenista',
  RECEPCION = 'recepcion',
}

export interface UserRol {
  rol: RolUsuario;
}

export interface UserEstado {
  estado: 'activo' | 'inactivo';
}

// Interfaz completa combinando las pequeñas
export type User = UserId & UserNombre & UserContacto & UserDistrito & UserPassword & UserRol & UserEstado;