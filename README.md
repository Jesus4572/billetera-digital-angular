# Billetera Digital - Caso 2 (Angular + Signals + Componentes)

Aplicación SPA desarrollada con **Angular**, **TypeScript**, **Signals** y arquitectura modular basada en componentes padre e hijo (`input()`, `output()`, `viewChild()`, `@if` y `@for`).

## Funcionalidades implementadas
- Saldo inicial automático de **S/ 250.00** administrado de forma reactiva con **Angular Signals**.
- Comunicación estructurada entre el componente padre (`App`) y el componente hijo (`NuevoMovimiento`).
- Registro de **Recargas (+)** y **Gastos (-)** con cálculo en tiempo real y marca de hora.
- Validación de montos mayores a cero y bloqueo de gastos cuando el saldo es insuficiente.
- Botón independiente para reiniciar la billetera y limpiar el formulario.

## Requisitos y ejecución
1. **Node.js (LTS)** y **Angular CLI**.
2. Instalar dependencias (si es la primera vez):
   `npm install`
3. Ejecutar el servidor de desarrollo:
   `ng serve -o`
4. Abrir en el navegador: `http://localhost:4200/`

## Evidencias de funcionamiento
Las capturas de pantalla de todas las pruebas (estado inicial, recarga, gasto, validaciones de error y reinicio) se encuentran en la carpeta EVIDENCIAS