import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
// import {map} from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private windRefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.document = this.documentService.getDocument(params.id);
    })
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
