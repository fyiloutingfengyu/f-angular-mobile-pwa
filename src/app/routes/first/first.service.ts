import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirstService {

    constructor() {
    }

    getUserInfo() {
        return {
            name: 'Tom',
            age: 15
        }
    }
}
