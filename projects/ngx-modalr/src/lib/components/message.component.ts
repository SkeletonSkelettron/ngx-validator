import { Component, ComponentRef, OnInit, EventEmitter } from '@angular/core';
import { DialogStyle, StandardMessages } from '../ngx-modalr.models';

@Component({
    templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

    title: string;

    closedEvent: EventEmitter<any> = new EventEmitter();

    message: string;
    // tslint:disable-next-line:variable-name
    _dialogStyle = DialogStyle;
    dialogStyle: DialogStyle; // 1 dialog, 2 message
    selfRefferer: ComponentRef<MessageComponent>;
    messageType: StandardMessages;
    result: Promise<any>;
    reject: any;
    resolve: any;
    modalType: string;
    yesText: string;
    noText: string;

    constructor() {
    }

    public YesClick(): void {
        this.resolve(true);
        this.closedEvent.emit();
        this.selfRefferer.destroy();
    }

    public NoClick(): void {
        this.resolve(false);
        this.closedEvent.emit();
        this.selfRefferer.destroy();
    }

    ngOnInit() {
        if (this.messageType === StandardMessages.Error) {
            this.modalType = 'modal-danger';
            this.title = !this.title ? 'შეცდომა' : this.title;
        }
        if (this.messageType === StandardMessages.Warning) {
            this.modalType = 'modal-warning';
            this.title = !this.title ? 'გაფრთხილება' : this.title;
        }
        if (this.messageType === StandardMessages.Success) {
            this.modalType = 'modal-success';
            this.title = !this.title ? 'შეტყობინება' : this.title;
        }
        if (this.messageType === StandardMessages.Limit) {
            this.modalType = 'modal-limit';
            this.title = !this.title ? 'შეზღუდვა' : this.title;
        }
        if (this.messageType === StandardMessages.Info) {
            this.modalType = 'modal-info';
            this.title = !this.title ? 'ინფორმაცია' : this.title;
        }
        if (this.messageType === StandardMessages.Question) {
            this.modalType = 'modal-question';
            this.title = !this.title ? 'შეკითხვა' : this.title;
        }
    }

}
