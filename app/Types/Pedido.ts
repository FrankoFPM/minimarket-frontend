export interface Pedido {
  id_pedido: number;
  id_usuario: string;
  fecha_pedido: string;
  estado: string;
  metodo_pago: string;
  total: number;
  descuento_aplicado: number;
  impuesto: number;
}