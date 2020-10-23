import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] { return this.documents.slice() }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id);
  }
}
