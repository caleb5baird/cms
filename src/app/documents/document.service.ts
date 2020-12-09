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
    this.http.get('http://localhost:3000/documents')
      .subscribe((responseData: {message: string, documents: Document[]}) => {
        this.documents = responseData.documents;
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
      document.id = '';

      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      // add to database
      this.http.post<{ message: string, document: Document }>
        ('http://localhost:3000/documents', document, { headers: headers })
        .subscribe((responseData: {message: string, document: Document}) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.storeDocuments()
        });
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      const pos = this.documents.indexOf(originalDocument);

      if (pos != -1) {
        newDocument.id = originalDocument.id;
        newDocument._id = originalDocument._id;

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        // update database
        this.http.put('http://localhost:3000/documents/' + originalDocument.id,
                      newDocument, { headers: headers })
          .subscribe(
            (response: Response) => {
              this.documents[pos] = newDocument;
              this.storeDocuments()
            }
          );
      }
    }
  }

  deleteDocument(document: Document): void {
    if (document) {
      const pos = this.documents.indexOf(document);

      if (pos != -1) {

        this.http.delete('http://localhost:3000/documents/' + document.id)
          .subscribe(
            (response: Response) => {
              this.documents.splice(pos, 1);
              this.storeDocuments()
            }
          );
      }
    }
  }

  storeDocuments(): void {

    // First make sure they are sorted
    this.documents.sort((lhs, rhs) =>
      lhs.name.localeCompare(rhs.name))

    let headers = new HttpHeaders({'content-type': 'application/json'});
    this.http.put('https://cms-app-77a0c.firebaseio.com/documents.json',
                  JSON.stringify(this.documents),
                  {headers: headers})
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      }, (error:any) => console.error(error))
  }
}
