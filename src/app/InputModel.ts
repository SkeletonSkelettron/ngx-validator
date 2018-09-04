import { Required, Pattern, StringLength } from 'projects/ngx-validator/src/public_api';


export class InputModel {


    id: number;

    @Required('ველი აუცილებელია')
    @Pattern({ value: '^[1-9]\d{0,2}$', error: 'ველი უნდა იყოს ტელეფონის ნომერი' })
    @StringLength({ min: 5, max: 10, error: 'ველი უნდა იყოს მინიმუმ 5 და მაქსიმუმ 10 სიმბოლოს სიგრძის'})
    cValue: string;

    case: string;
    isActive: boolean;

    // @configurable(false)
    getdata() { }

    constructor() {
        this.id = 7;
        this.case = 'fffff',
            this.cValue = 'ggggg';
        this.isActive = false;
    }
}

