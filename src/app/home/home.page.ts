import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { FileHandlerService } from '../Services/file-handler.service';
import { DataSharerService } from '../Services/data-sharer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  WordlistLoaded : boolean;
  SelectedLengthValid : boolean;
  InputType : boolean = false;

  async onFileChange($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    const contents = await this.FH.UploadFile(element.files[0]);
    this.DSH.Wordlist = contents;
    this.WordlistLoaded = true;
    this.CheckValidLength();
  }

  OnRangeChange($event: Event) {
    this.SelectedValue = ($event as RangeCustomEvent).detail.value;
    this.DSH.BoardSize = this.SelectedValue as number;
    this.CheckValidLength();
  }

  constructor(private FH : FileHandlerService, private DSH : DataSharerService, private router: Router) {
    this.WordlistLoaded = false;
    this.SelectedLengthValid = false;
  }

  SelectedValue : RangeValue = 2;

  StartBazooper()
  {
    this.DSH.ButtonsEnabled = true;
    this.router.navigate(['./bazoopergame']);
  }

  ChangeInputType()
  {
    this.InputType = !this.InputType;
    this.DSH.Wordlist = [];
    this.WordlistLoaded = false;
    this.CheckValidLength();
  }

  private CheckValidLength() {

    if (this.WordlistLoaded) {
      if ((this.SelectedValue as number) * (this.SelectedValue as number) <= this.DSH.Wordlist.length) {
        this.SelectedLengthValid = true;
      }
      else {
        this.SelectedLengthValid = false;
      }
    }
    else
    {
      this.SelectedLengthValid = false;
    }
  }

  WordListChanged($event : Event)
  {
    let cool = ($event.currentTarget as HTMLInputElement).value.trim();
    let bean = cool.split('\n');
    this.DSH.Wordlist = bean;
    this.WordlistLoaded = true;

    this.CheckValidLength();
  }
}
