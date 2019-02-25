export class NgxValidator<T> {

    instanceOfT: T;

    RuleFor<TOut>(keySelector: (key: T) => TOut) {
        return keySelector(this.instanceOfT);
    }
    constructor(instance?: T) {
        this.instanceOfT = instance;
    }
}
