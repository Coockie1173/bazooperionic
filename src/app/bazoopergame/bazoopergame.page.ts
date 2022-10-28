import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataSharerService } from '../Services/data-sharer.service';
import { ButtonstateInterface } from './bazooperbutton/bazooperbutton.component';
import { Location } from "@angular/common";
import {NativeAudio} from '@capacitor-community/native-audio'


@Component({
  selector: 'app-bazoopergame',
  templateUrl: './bazoopergame.page.html',
  styleUrls: ['./bazoopergame.page.scss'],
})
export class BazoopergamePage implements OnInit {

  constructor(public DSH: DataSharerService, private router : Router, private sanitizer: DomSanitizer, private location: Location) 
  { 
    //this.DSH.SetDebugWordList();
    if(this.DSH.BoardSize == undefined)
    {
      this.DSH.BoardSize = 2;
    }
    if(this.DSH.Wordlist == null)
    {
      this.router.navigate(['']);
    }    
    this.shuffledArray = this.shuffleArray(this.DSH.Wordlist);    

    this.booldata = Array<boolean>(this.DSH.BoardSize*this.DSH.BoardSize);

    for(let i = 0; i < this.DSH.BoardSize * this.DSH.BoardSize; i++)
    {
      this.booldata[i] = false;
    }

    NativeAudio.preload({
      assetId: "bazoop",
      assetPath: "bazooper.wav",
      audioChannelNum: 1,
      isUrl: false
    });
    
    NativeAudio.preload({
      assetId: "a (1)",
      assetPath: "a (1).wav",
      audioChannelNum: 1,
      isUrl: false
    });
    
    NativeAudio.preload({
      assetId: "a (2)",
      assetPath: "a (2).wav",
      audioChannelNum: 1,
      isUrl: false
    });
    
    NativeAudio.preload({
      assetId: "a (3)",
      assetPath: "a (3).wav",
      audioChannelNum: 1,
      isUrl: false
    });
    
    NativeAudio.preload({
      assetId: "a (4)",
      assetPath: "a (4).wav",
      audioChannelNum: 1,
      isUrl: false
    });
  }

  FileNames : string[] = [
      "bazoop",
      "a (1)",
      "a (2)",
      "a (3)",
      "a (4)"
  ];

  shuffledArray:[]; 
  booldata : boolean[];
  GifName : string;

  SquareSize : string;

  GetSquareSize() : any
  {
    let styles = 
    {
      'width': 'calc(100vmin / ' + this.DSH.BoardSize + ')',
      'height': 'calc(100vmin / ' + this.DSH.BoardSize + ')',
    }
    return styles;
  }
  
  ngOnInit() {

  }

  numSequence(n : number) : Array<number>
  {
    return Array(n);
  }

  shuffleArray(array) {
    var m = array.length, t, i;
 
    while (m) {    
     i = Math.floor(Math.random() * m--);
     t = array[m];
     array[m] = array[i];
     array[i] = t;
    }
 
   return array;
 }

 CheckBazooper(state : ButtonstateInterface)
 {
    this.booldata[state.MyID] = state.pressed;

    let BingoType : number = 0;
    let Bazooper : boolean = false;
    let TotalBazooperItems = this.DSH.BoardSize * this.DSH.BoardSize;

    for(let i = 0; i < TotalBazooperItems; i += this.DSH.BoardSize)
    {
      if(!Bazooper)
      {
        Bazooper = true;
        for(let x = i; x < i + this.DSH.BoardSize; x++)
        {
          BingoType = 0;
          Bazooper = Bazooper && this.booldata[x];
        }
      }
    }

    
    if(!Bazooper)
    {
      for(let i = 0; i < this.DSH.BoardSize; i += 1)
      {
        if(!Bazooper)
        {
          Bazooper = true;
          for(let x = 0; x < this.DSH.BoardSize; x++)
          {
            BingoType = 1;
            Bazooper = Bazooper && this.booldata[x * this.DSH.BoardSize + i];
          }
        }
      }
    }

    
    if(!Bazooper)
    {
      Bazooper = true;
      for(let i = 0; i < TotalBazooperItems; i += this.DSH.BoardSize + 1)
      {
        Bazooper = Bazooper && this.booldata[i];
      }
      
      if(!Bazooper)
      {
        Bazooper = true;
        for(let i = TotalBazooperItems - this.DSH.BoardSize; i > 0; i -= this.DSH.BoardSize - 1)
        {
          Bazooper = Bazooper && this.booldata[i];
        }
      }
    }

    if(Bazooper)
    {
      this.DSH.ButtonsEnabled = false;

      this.GifName = "";
      setTimeout(() => {
        this.GifName = "out2" //hacky way of forcing the gif to restart
      }, 1);      
      
      NativeAudio.play({
        assetId: this.FileNames[Math.floor(Math.random() * this.FileNames.length)],
        time: 0
      });

      setTimeout(() =>
      {
        this.location.back();
      }, 10000);
    }    
 }
}
