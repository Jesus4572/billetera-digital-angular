export interface Movimiento {
  id: number;
  tipo: 'Recarga' | 'Gasto';
  monto: number;
  fecha: Date;
}