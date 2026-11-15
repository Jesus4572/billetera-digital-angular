import { Component } from '@angular/core';
import { BilleteraComponent } from './components/billetera-component/billetera-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilleteraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}