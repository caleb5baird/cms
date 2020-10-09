import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('0', 'CIT 260 - Object Oriented Programming'),
    new Document(
      '1',
      'CIT 366 - Full Web Stack Development',
      'Learn how to develop modern web applications using the MEAN stack.',
      'https://content.byui.edu/file/b7c3ed-6947-4971-9d32-4e5b6b397cac/1/CIT s66 course description.pdf'),
    new Document('2', 'CIT 425 - Data Warehousing'),
    new Document('3', 'CIT 460 - Enterprise Development'),
    new Document('4', 'CIT 495 - Senior Practicum')
  ];

  constructor() { }

  ngOnInit(): void {}

  onSelected(document: Document): void {
    this.selectedDocumentEvent.emit(document);
  }
}
