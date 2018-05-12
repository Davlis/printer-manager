import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-printer-stat',
  templateUrl: './printer-stat.component.html',
  styleUrls: ['./printer-stat.component.css']
})
export class PrinterStatComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

}
