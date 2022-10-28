import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BazoopergamePage } from './bazoopergame.page';

const routes: Routes = [
  {
    path: '',
    component: BazoopergamePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BazoopergamePageRoutingModule {}
