import { Component, OnInit } from '@angular/core';
import { NgxModalrEditorBase } from 'projects/ngx-modalr/src/lib/components/ngx-modalr-editor-base';

@Component({
  templateUrl: './dummy-component.component.html'
})
export class DummyComponentComponent extends NgxModalrEditorBase<string, any> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
