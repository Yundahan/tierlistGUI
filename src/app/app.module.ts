import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TierListComponent } from './skins/tier-list.component';
import { SkinComponent } from './skins/skin.component';
import { TierComponent } from './skins/tier.component';
import { TierCardComponent } from './skins/tier-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TierListComponent,
    SkinComponent,
    TierComponent,
    TierCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
