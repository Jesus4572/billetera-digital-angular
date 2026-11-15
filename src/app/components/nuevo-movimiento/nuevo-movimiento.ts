import { Component, computed, input, output, signal } from '@angular/core';
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
export class NuevoMovimientoComponent {
  saldoActual = input.required<number>();
  registrarMovimiento = output<NuevoMovimientoEvento>();
  errorValidacion = output<void>();

  tipo = signal<'Recarga' | 'Gasto'>('Recarga');
  monto = signal<number | null>(null);
  campoTocado = signal<boolean>(false);

  mensajeValidacion = computed(() => {
    const val = this.monto();
    if (val === null || isNaN(val)) {
      return this.campoTocado() ? 'Error: Debe ingresar un monto numérico válido.' : '';
    }
    if (val <= 0) {
      return 'Error: El monto debe ser mayor a S/ 0.00.';
    }
    if (this.tipo() === 'Gasto' && val > this.saldoActual()) {
      return `Error: Saldo insuficiente (máximo disponible: S/ ${this.saldoActual().toFixed(2)}).`;
    }
    return '';
  });

  formularioInvalido = computed(() => {
    const val = this.monto();
    if (val === null || isNaN(val) || val <= 0) return true;
    if (this.tipo() === 'Gasto' && val > this.saldoActual()) return true;
    return false;
  });

  onTipoChange(nuevoTipo: 'Recarga' | 'Gasto'): void {
    this.tipo.set(nuevoTipo);
    if (this.formularioInvalido() && this.campoTocado()) {
      this.errorValidacion.emit();
    }
  }

  onMontoChange(valor: number | null): void {
    this.campoTocado.set(true);
    this.monto.set(valor);
    if (this.formularioInvalido()) {
      this.errorValidacion.emit();
    }
  }

  procesarFormulario(): void {
    this.campoTocado.set(true);
    if (this.formularioInvalido()) {
      this.errorValidacion.emit();
      return;
    }

    this.registrarMovimiento.emit({
      tipo: this.tipo(),
      monto: this.monto()!
    });

    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.campoTocado.set(false);
    this.monto.set(null);
    this.tipo.set('Recarga');
  }
}