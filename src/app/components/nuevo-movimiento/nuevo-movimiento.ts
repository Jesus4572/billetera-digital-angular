import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface NuevoMovimientoEvento {
  tipo: 'Recarga' | 'Gasto';
  monto: number;
}

@Component({
  selector: 'app-nuevo-movimiento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevo-movimiento.html',
  styleUrl: './nuevo-movimiento.css'
})
export class NuevoMovimiento {
  saldoActual = input.required<number>();
  registrarMovimiento = output<NuevoMovimientoEvento>();
  errorValidacion = output<void>();

  tipo = signal<'Recarga' | 'Gasto'>('Recarga');
  monto = signal<number | null>(null);
  mensajeError = signal<string>('');

  procesarFormulario(): void {
    const valorMonto = this.monto();
    const tipoSeleccionado = this.tipo();

    if (valorMonto === null || isNaN(valorMonto) || valorMonto <= 0) {
      this.mensajeError.set('Error: El monto debe ser mayor a S/ 0.00.');
      this.errorValidacion.emit();
      return;
    }

    if (tipoSeleccionado === 'Gasto' && valorMonto > this.saldoActual()) {
      this.mensajeError.set('Error: Saldo insuficiente para realizar este gasto.');
      this.errorValidacion.emit();
      return;
    }

    this.mensajeError.set('');
    this.registrarMovimiento.emit({
      tipo: tipoSeleccionado,
      monto: valorMonto
    });

    this.monto.set(null);
  }

  limpiarFormulario(): void {
    this.mensajeError.set('');
    this.monto.set(null);
    this.tipo.set('Recarga');
  }
}