import { NgModule } from '@angular/core';
import { App } from '../../../app';
import { SHARED_IMPORTS } from '../../shared/imports';
import { RouterModule } from "@angular/router";
import { HCareer3Component } from '../../../pages/careers/h-career3/h-career3.component';

@NgModule({

  declarations: [
    // AppComponent

  ],
  imports: [
    ...SHARED_IMPORTS,
    RouterModule
]
})
export class PModuleModule { }
