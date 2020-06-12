import { NgModule } from '@angular/core';
import {NbCardModule, NbInputModule, NbListModule, NbMenuModule, NbButtonModule, NbLayoutModule, NbIconModule, NbSelectModule, NbToastrModule, NbSpinnerModule} from '@nebular/theme';
import {NgxGalleryModule} from "ngx-gallery";
import {MsalModule} from '@azure/msal-angular';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {AuthModule} from "./auth/auth.module";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {PhotosModule} from "./photos/photos.module";
import {FormsModule} from "@angular/forms";
import {ArticlesModule} from "./articles/articles.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {OAuthSettings} from "../@core/utils/oauth";
import {AdminGuard, AuthGuard} from "../@core/guards/auth.guard";
import {UserEditComponent} from "./user/user-edit/user-edit.component";

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        AuthModule,
        PhotosModule,
        ArticlesModule,
        NbCardModule,
        NbSelectModule,
        NbListModule,
        NbInputModule,
        NbButtonModule,
        NbLayoutModule,
      FormsModule,
        NbToastrModule,
        NbIconModule,
        NbSpinnerModule,
        NgxGalleryModule,
        MsalModule.forRoot({
            clientID: OAuthSettings.appId,
        })
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        UserEditComponent
    ],
    entryComponents: [
      UserEditComponent
    ]


})
export class PagesModule {
}
