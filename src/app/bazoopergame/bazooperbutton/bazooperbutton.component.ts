import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharerService } from 'src/app/Services/data-sharer.service';

@Component({
  selector: 'app-bazooperbutton',
  templateUrl: './bazooperbutton.component.html',
  styleUrls: ['./bazooperbutton.component.scss'],
})
export class BazooperbuttonComponent implements OnInit {

  constructor(private DSH : DataSharerService) { }

  ngOnInit() {}

  ngOnChanges()
  {
    
  }

  @Input() MyText : string = "";
  @Input() MyID : number = 0;

  @Output() OnStateChange = new EventEmitter<ButtonstateInterface>();

  private MyState : boolean = false;

  GetPressedState() : string
  {
    if(this.MyState)
    {
      return "checked";
    }
    else
    {
      return "unchecked"
    }
  }

  Pressed()
  {
    if(this.DSH.ButtonsEnabled)
    {
      this.MyState = !this.MyState;
      let inter : ButtonstateInterface = {} as ButtonstateInterface;
      inter.MyID = this.MyID;
      inter.pressed = this.MyState;
      this.OnStateChange.emit(inter);
    }
  }
}

export interface ButtonstateInterface
{
  pressed: boolean;
  MyID : number;
}