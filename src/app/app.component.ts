import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms';

  selectedFeature = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
