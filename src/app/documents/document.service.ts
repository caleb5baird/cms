import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from '../documents/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId = 0;

  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] { return this.documents.slice() }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id);
  }

  getMaxId(): number {
    let ids = this.documents.map(document => parseInt(document.id))
    return Math.max(...ids);
  }

  addDocument(document: Document): void {
    if (document) {
      ++this.maxDocumentId;
      document.id = this.maxDocumentId.toString();
      this.documents.push(document);
      this.documentListChangedEvent.next(this.documents.slice());
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      const pos = this.documents.indexOf(originalDocument);

      if (pos != -1) {
        newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        this.documentListChangedEvent.next(this.documents.slice())
      }
    }
  }

  deleteDocument(document: Document): void {
    if (document) {
      const pos = this.documents.indexOf(document);

      if (pos != -1) {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
      }
    }
  }
}
