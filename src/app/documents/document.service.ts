import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from '../documents/document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId = 0;

  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(
    private http: HttpClient
  ) {
    http.get('https://cms-app-77a0c.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((lhs, rhs) =>
          lhs.name.localeCompare(rhs.name))
        this.documentListChangedEvent.next(this.documents.slice());
      }, (error:any) => console.error(error))
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
      this.storeDocuments()
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      const pos = this.documents.indexOf(originalDocument);

      if (pos != -1) {
        newDocument.id = originalDocument.id
        this.documents[pos] = newDocument
        this.storeDocuments()
      }
    }
  }

  deleteDocument(document: Document): void {
    if (document) {
      const pos = this.documents.indexOf(document);

      if (pos != -1) {
        this.documents.splice(pos, 1);
        this.storeDocuments()
      }
    }
  }

  storeDocuments(): void {
    let headers = new HttpHeaders({'content-type': 'application/json'});
    this.http.put('https://cms-app-77a0c.firebaseio.com/documents.json',
                  JSON.stringify(this.documents),
                  {headers: headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      }, (error:any) => console.error(error))
  }
}
