import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BazoopergamePageRoutingModule } from './bazoopergame-routing.module';

import { BazoopergamePage } from './bazoopergame.page';
import { BazooperbuttonComponent } from './bazooperbutton/bazooperbutton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BazoopergamePageRoutingModule,    
  ],
  declarations: [BazoopergamePage, BazooperbuttonComponent]
})
export class BazoopergamePageModule {}
