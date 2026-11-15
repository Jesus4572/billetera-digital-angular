import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movimiento } from '../../models/movimiento.model';
import { NuevoMovimientoComponent, NuevoMovimientoEvento } from '../nuevo-movimiento/nuevo-movimiento';

@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [CommonModule, NuevoMovimientoComponent],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css'
})
export class BilleteraComponent {
  private readonly SALDO_INICIAL = 250.00;
  private formHijo = viewChild(NuevoMovimientoComponent);

  saldo = signal<number>(this.SALDO_INICIAL);
  movimientos = signal<Movimiento[]>([]);
  mensajeExito = signal<string>('');

  agregarMovimiento(evento: NuevoMovimientoEvento): void {
    if (evento.tipo === 'Recarga') {
      this.saldo.update(s => s + evento.monto);
    } else {
      this.saldo.update(s => s - evento.monto);
    }

    const nuevo: Movimiento = {
      id: Date.now(),
      tipo: evento.tipo,
      monto: evento.monto,
      fecha: new Date()
    };

    this.movimientos.update(lista => [nuevo, ...lista]);
    this.mensajeExito.set(`Operación (${evento.tipo}) por S/ ${evento.monto.toFixed(2)} registrada con éxito.`);
  }

  reiniciarBilletera(): void {
    this.saldo.set(this.SALDO_INICIAL);
    this.movimientos.set([]);
    this.mensajeExito.set('Billetera reiniciada correctamente al saldo inicial.');
    this.formHijo()?.limpiarFormulario();
  }
}