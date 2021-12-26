import { ComponentRef } from '@angular/core';

export class NgxModalrEditorBase<T, T2> {
    editorItem: T;
    additionalData: T2;
    containerModalRef: ComponentRef<any>;

    result(data: T) {
        this.containerModalRef.instance.finish(data);
    }
}
