import {
    Component, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
    EventEmitter, ViewChild, OnInit, Type, ElementRef, AfterViewInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxModalrEditorBase } from './ngx-modalr-editor-base';

@Component({
    templateUrl: './ngx-modalr-editor.component.html'
})
export class NgxModalrEditorComponent<R, R2> implements OnInit {

    public selfRefferer: ComponentRef<NgxModalrEditorComponent<R, R2>>;
    public childComponent: Type<NgxModalrEditorBase<R, R2>>;
    public childComponentRef: ComponentRef<NgxModalrEditorBase<R, R2>>;

    public result: Promise<R>;
    public reject: any;
    public resolve: any;
    public editorItem: R;
    public additionalData: R2;


    @ViewChild('child', { read: ViewContainerRef, static: true  })
    viewContainer: ViewContainerRef;


    closedEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        private el: ElementRef,
        private factoryResolver: ComponentFactoryResolver,
        public translate: TranslateService) {

    }

    public finish(data: R) {
        this.resolve(data);
        this.closedEvent.emit();
        this.selfRefferer.destroy();
    }
    ngOnInit() {
        const factory = this.factoryResolver.resolveComponentFactory(this.childComponent);
        this.childComponentRef = this.viewContainer.createComponent(factory);
        this.childComponentRef.instance.editorItem = this.editorItem;
        // this.childComponentRef.instance.selfRefferer = this.childComponentRef;
        this.childComponentRef.instance.containerModalRef = this.selfRefferer;
        this.childComponentRef.instance.additionalData = this.additionalData;
    }
}

