import { Component } from '@angular/core';
import { BilleteraComponent } from './components/billetera/billetera';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilleteraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}