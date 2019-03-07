import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';

import { HeaderComponent } from './web-components/header/header.component';
import { HomeComponent } from './web-components/home/home.component';
import { SignInComponent } from './module-components/sign-in/sign-in.component';
import { SignUpComponent } from './module-components/sign-up/sign-up.component';
import { UserProfileComponent } from './module-components/user-profile/user-profile.component';
import { NotFoundErrorComponent } from './web-components/not-found-error/not-found-error.component';
import { UserSideBarComponent } from './web-components/user-side-bar/user-side-bar.component';
import { UserInformationComponent } from './module-components/user-profile/user-information/user-information.component';
import { UserUpdateComponent } from './module-components/user-profile/user-update/user-update.component';
import { PostComponent } from './module-components/post/post.component';
import { CreatePostSaleComponent } from './module-components/post/create-post-sale/create-post-sale.component';
import { CreatePostBuyComponent } from './module-components/post/create-post-buy/create-post-buy.component';
import { PostSideBarComponent } from './web-components/post-side-bar/post-side-bar.component';
import { ManagePostComponent } from './module-components/post/manage-post/manage-post.component';
import { UploadPhotoComponent } from './module-components/post/create-post-sale/upload-photo/upload-photo.component';
import { PostDetailComponent } from './module-components/post/manage-post/post-detail/post-detail.component';
import { PostDetailBarComponent } from './web-components/post-detail-bar/post-detail-bar.component';
import { InformationComponent } from './module-components/post/manage-post/post-detail/information/information.component';
import { LocationComponent } from './module-components/post/manage-post/post-detail/location/location.component';
import { FooterComponent } from './web-components/footer/footer.component';
import { SearchingResultComponent } from './web-components/searching-result/searching-result.component';
import { UserChangePasswordComponent } from './module-components/user-profile/user-change-password/user-change-password.component';
import { CategorySaleComponent } from './web-components/category-sale/category-sale.component';
import { CategoryBuyComponent } from './web-components/category-buy/category-buy.component';
import { ListItemComponent } from './web-components/list-item/list-item.component';
import { CreateProjectComponent } from './module-components/post/create-project/create-project.component';
import { ProjectPageComponent } from './web-components/project-page/project-page.component';
import { UploadProjectPhotoComponent } from './module-components/post/create-project/upload-project-photo/upload-project-photo.component';
import { UploadProjectVideoComponent } from './module-components/post/create-project/upload-project-video/upload-project-video.component';
import { UploadProjectMapComponent } from './module-components/post/create-project/upload-project-map/upload-project-map.component';
import { ProjectVideoComponent } from './module-components/post/manage-post/post-detail/project-video/project-video.component';
import { ProjectDesignComponent } from './module-components/post/manage-post/post-detail/project-design/project-design.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    NotFoundErrorComponent,
    UserSideBarComponent,
    UserInformationComponent,
    UserUpdateComponent,
    PostComponent,
    CreatePostSaleComponent,
    CreatePostBuyComponent,
    PostSideBarComponent,
    ManagePostComponent,
    UploadPhotoComponent,
    PostDetailComponent,
    PostDetailBarComponent,
    InformationComponent,
    LocationComponent,
    FooterComponent,
    SearchingResultComponent,
    UserChangePasswordComponent,
    CategorySaleComponent,
    CategoryBuyComponent,
    ListItemComponent,
    CreateProjectComponent,
    ProjectPageComponent,
    UploadProjectPhotoComponent,
    UploadProjectVideoComponent,
    UploadProjectMapComponent,
    ProjectVideoComponent,
    ProjectDesignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
