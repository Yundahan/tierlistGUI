import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SkinListComponent } from './skins/skin-list.component';
import { SkinComponent } from './skins/skin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SkinListComponent,
    SkinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
