import { Component, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';

@Component({
    templateUrl: './ngx-modalr-host.component.html'
})
export class NgxModalrHostComponent {

    show: string;
    selfRefferer: ComponentRef<NgxModalrHostComponent>;

    @ViewChild('modalElem', { read: ViewContainerRef, static: true })
    public modalElem: ViewContainerRef;

    constructor() {
    }
}
