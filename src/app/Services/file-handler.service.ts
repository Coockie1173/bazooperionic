import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  constructor() { }

  UploadFile(file) : Promise<Array<string>>
  {
    return new Promise<Array<string>>((resolve, reject) =>{
        const reader = new FileReader();

        if(!file)
        {
          reject("Unable to upload file!");
        }

        reader.onload =(e) =>
        {
          const WholeText = reader.result.toString();
          const result = WholeText.split(/\r?\n/).filter(element => element); //clear empty line - https://bobbyhadz.com/blog/javascript-split-string-by-newline#:~:text=To%20split%20a%20string%20by%20newline%2C%20call%20the%20split(),an%20array%20containing%20the%20substrings.
          
          console.log(result);

          resolve(result);
        };

        reader.readAsText(file);
    });
  }
}
