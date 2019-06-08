import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { 
  AngularFirestore, 
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) { 
    this.items = this.afs.collection('xlsx').valueChanges();
  }

  getItems() {
    return this.items;
  }

}

