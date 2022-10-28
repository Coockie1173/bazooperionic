import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharerService {

  constructor() { }

  Wordlist : Array<string>;
  BoardSize : number;
  ButtonsEnabled = true;


  SetDebugWordList()
  {
    this.Wordlist = ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bananenboot", "c", "d", "e", "f", "g", "h", "i", "j","k","l","m","o","p","q","r","s","t","u","v","w","x","y","z"];
    this.BoardSize = 6;
  }
}
