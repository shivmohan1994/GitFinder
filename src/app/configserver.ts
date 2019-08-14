import {Injectable} from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class Configserver {
    
    public serverUrl = "https://api.github.com/";
}

