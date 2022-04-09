import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SkinSearchComponent } from './nav-bar/skin-search.component';
import { TierListComponent } from './skins/tier-list.component';
import { SkinComponent } from './skins/skin.component';
import { TierComponent } from './skins/tier.component';
import { TierCardComponent } from './skins/tier-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SkinSearchComponent,
    TierListComponent,
    SkinComponent,
    TierComponent,
    TierCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
