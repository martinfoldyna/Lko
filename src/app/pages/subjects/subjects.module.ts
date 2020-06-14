import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SubjectsComponent } from './subjects.component';
import { WebComponent } from './web/web.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { DrawingsComponent } from './drawings/drawings.component';
import {SubjectsRoutingModule} from "./subjects-routing.module";
import {NgxGalleryModule} from "ngx-gallery";

import {
  NbTabsetModule,
  NbCardModule,
  NbSpinnerModule,
  NbLayoutModule,
  NbActionsModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbDialogModule
} from "@nebular/theme";
import {ArticlesModule} from "../articles/articles.module";
import {PhotosModule} from "../photos/photos.module";
import {PagesModule} from "../pages.module";
import {ExtraComponentsModule} from "../extra-components/extra-components.module";
import { UrlCardComponent } from './web/url-card/url-card.component';
import {MomentModule} from "ngx-moment";
import {DeleteConfirmationComponent} from "./delete-confirmation/delete-confirmation.component";


@NgModule({
  declarations: [SubjectsComponent, WebComponent, MultimediaComponent, DrawingsComponent, UrlCardComponent, DeleteConfirmationComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    NbTabsetModule,
    NbCardModule,
    NbInputModule,
    NbSpinnerModule,
    FormsModule,
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDialogModule,
    ArticlesModule,
    PhotosModule,
    PagesModule,
    ExtraComponentsModule,
    NbIconModule,
    MomentModule,
    NgxGalleryModule,
  ],
  entryComponents: [DeleteConfirmationComponent]
})
export class SubjectsModule { }
