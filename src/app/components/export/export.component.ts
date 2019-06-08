import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';
import * as XLSX from 'xlsx';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  items: any[];

  constructor(private itemService: ItemService, private firestore: AngularFirestore) { }


  title = 'excelTest';

  file: File;

  jsonData = [];

  private toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }
  incomingfile(event) {
    this.file = event.target.files[0];
  }


  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items
    });
  }

  Export() {
    // this.jsonData = this.items.data;
    this.jsonData = [];
    for (let item of this.items) {
      for (let data of item.data) {
        this.jsonData.push(data)

      }
    }
    console.log(this.jsonData);

    this.exportAsExcelFile(this.jsonData, 'test.xlsx');
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
  }


}
