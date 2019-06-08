import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { AngularFirestore } from '@angular/fire/firestore';

const { read, write, utils } = XLSX;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent{
  
  title = 'excelTest';

  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  constructor(private firestore: AngularFirestore) { }

  Upload() {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, {header: 2});
      console.log(data);
      this.firestore.collection('xlsx').add({data});
      // this.fireDatabase.add(data);
    };
    reader.readAsBinaryString(this.file);
  }

}
