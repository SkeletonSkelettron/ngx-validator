import {
  Injectable, ViewContainerRef, ComponentFactoryResolver, Injector, ApplicationRef,
  Type, EmbeddedViewRef, ComponentRef
} from '@angular/core';
import { NgxModalrEditorComponent } from './components/ngx-modalr-editor.component';
import { MessageComponent } from './components/message.component';
import { NgxModalrHostComponent } from './components/ngx-modalr-host.component';
import { DialogStyle, StandardMessages } from './ngx-modalr.models';

@Injectable({
  providedIn: 'root'
})
export class NgxModalrService {

  private vCRef: ViewContainerRef;
  private modalHostComponent: NgxModalrHostComponent;
  private modalHostComponentRef: ComponentRef<NgxModalrHostComponent>;
  private elemCount = 0;

  constructor(private factoryResolver: ComponentFactoryResolver, private injector: Injector, private applicationRef: ApplicationRef) {

  }

  public showMessage(messageType: StandardMessages, message: string | string[]): Promise<boolean> {
    if (!this.modalHostComponent) {
      this.modalHostComponent = this.createModalHost();
    }
    this.elemCount++;
    const factory = this.factoryResolver.resolveComponentFactory(MessageComponent);
    const t = this.vCRef.createComponent(factory);
    t.instance.selfRefferer = t;
    if (Array.isArray(message)) {
      t.instance.message = this.getHtmlStringFromArray(message);
    } else {
      t.instance.message = message;
    }
    t.instance.closedEvent.subscribe(() => {
      this.elemCount--;
      this.destroyModalHost();
    });
    t.instance.messageType = messageType;
    t.instance.dialogStyle = DialogStyle.Message;
    t.instance.result = new Promise((resolve, reject) => {
      t.instance.resolve = resolve;
      t.instance.reject = reject;
    });
    return t.instance.result;
  }

  public showDialog(messageType: StandardMessages, title: string, message: string | string[],
                    yesText?: string, noText?: string): Promise<boolean> {
    if (!this.modalHostComponent) {
      this.modalHostComponent = this.createModalHost();
    }
    this.elemCount++;
    const factory = this.factoryResolver.resolveComponentFactory(MessageComponent);
    const t = this.vCRef.createComponent(factory);
    t.instance.selfRefferer = t;
    if (Array.isArray(message)) {
      t.instance.message = this.getHtmlStringFromArray(message);
    } else {
      t.instance.message = message;
    }
    t.instance.title = title;
    t.instance.messageType = messageType;
    t.instance.yesText = yesText;
    t.instance.noText = noText;
    t.instance.dialogStyle = DialogStyle.Dialog;
    t.instance.closedEvent.subscribe(() => {
      this.elemCount--;
      this.destroyModalHost();
    });
    t.instance.result = new Promise((resolve, reject) => {
      t.instance.resolve = resolve;
      t.instance.reject = reject;
    });
    return t.instance.result;
  }

  public showEditor<T, T2>(component: Type<any>, editorItem: T, additionalData: T2): Promise<T> {

    if (!this.modalHostComponent) {
      this.modalHostComponent = this.createModalHost();
    }
    this.elemCount++;
    const factory = this.factoryResolver.resolveComponentFactory(NgxModalrEditorComponent);
    const t = this.vCRef.createComponent(factory);
    t.instance.selfRefferer = t;
    t.instance.childComponent = component;
    t.instance.editorItem = editorItem;
    if (additionalData) {
      t.instance.additionalData = additionalData;
    }
    t.instance.closedEvent.subscribe(() => {
      this.elemCount--;
      this.destroyModalHost();
    });
    t.instance.result = new Promise<T>((resolve, reject) => {
      t.instance.resolve = resolve;
      t.instance.reject = reject;
    });

    return t.instance.result as Promise<T>;
  }

  private createModalHost(): NgxModalrHostComponent {
    const componentFactory = this.factoryResolver.resolveComponentFactory(NgxModalrHostComponent);
    const componentRef = componentFactory.create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.modalHostComponentRef = componentRef;
    componentRef.onDestroy(() => {
        this.applicationRef.detachView(componentRef.hostView);
    });
    this.vCRef = componentRef.instance.modalElem;
    return componentRef.instance;
  }

  private getHtmlStringFromArray(errors: string[]): string {
    if (errors && errors.length > 0) {
      if (errors.length === 1) {
        return errors[0];
      }
      if (errors.length > 1) {
        let retVal = '';
        errors.forEach(error => {
          retVal += '<li>' + error + '</li>';
        });
        return '<ul>' + retVal + '</ul>';
      }
    } else {
      return '';
    }
  }
  private destroyModalHost(): void {
    if (!this.elemCount) {
      this.modalHostComponentRef.destroy();
      this.modalHostComponent = null;
    }
  }
}
