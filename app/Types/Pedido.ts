export interface Pedido {
  id: number;
  idUsuarioIdUsuario: string;
  idUsuarioNombre: string;
  idUsuarioApellido: string;
  fechaPedido: string;
  estado: string;
  metodoPago: string;
  total: number;
  descuentoAplicado: number;
  impuesto: number;
  createdAt: string;
  updatedAt: string;
  comprobanteId: number | null;
}