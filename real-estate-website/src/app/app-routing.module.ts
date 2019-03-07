import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './web-components/home/home.component';
import { PostComponent } from './module-components/post/post.component';
import { CreatePostBuyComponent } from './module-components/post/create-post-buy/create-post-buy.component';
import { CreatePostSaleComponent } from './module-components/post/create-post-sale/create-post-sale.component';
import { CreateProjectComponent } from './module-components/post/create-project/create-project.component';
import { ManagePostComponent } from './module-components/post/manage-post/manage-post.component';
import { NotFoundErrorComponent } from './web-components/not-found-error/not-found-error.component';
import { SignInComponent } from './module-components/sign-in/sign-in.component';
import { SignUpComponent } from './module-components/sign-up/sign-up.component';
import { UserProfileComponent } from './module-components/user-profile/user-profile.component';
import { UserInformationComponent } from './module-components/user-profile/user-information/user-information.component';
import { UserUpdateComponent } from './module-components/user-profile/user-update/user-update.component';
import { UserChangePasswordComponent } from './module-components/user-profile/user-change-password/user-change-password.component';
import { UploadPhotoComponent } from './module-components/post/create-post-sale/upload-photo/upload-photo.component';
import { PostDetailComponent } from './module-components/post/manage-post/post-detail/post-detail.component';
import { InformationComponent } from './module-components/post/manage-post/post-detail/information/information.component';
import { LocationComponent } from './module-components/post/manage-post/post-detail/location/location.component';
import { SearchingResultComponent } from './web-components/searching-result/searching-result.component';
import { CategorySaleComponent } from './web-components/category-sale/category-sale.component';
import { CategoryBuyComponent } from './web-components/category-buy/category-buy.component';
import { ProjectPageComponent } from './web-components/project-page/project-page.component';
import { ListItemComponent } from './web-components/list-item/list-item.component';
import { UploadProjectPhotoComponent } from './module-components/post/create-project/upload-project-photo/upload-project-photo.component';
import { UploadProjectVideoComponent } from './module-components/post/create-project/upload-project-video/upload-project-video.component';
import { UploadProjectMapComponent } from './module-components/post/create-project/upload-project-map/upload-project-map.component';

const routes: Routes = [
  {path: 'home', component : HomeComponent},
  {path: '', redirectTo: 'home', pathMatch : 'full'},

  {path: 'login', component : SignInComponent},
  {path: 'register', component : SignUpComponent},
  {
    path: 'user/profile',
    component : UserProfileComponent,
    children: [
      {path: 'information', component: UserInformationComponent},
      {path: 'update', component: UserUpdateComponent},
      {path: 'change-password', component: UserChangePasswordComponent}
    ]
  },
  {
    path: 'post',
    component : PostComponent,
    children: [
      {path: 'create/buy', component: CreatePostBuyComponent},
      {path: 'create/sale', component: CreatePostSaleComponent},
      {
        path: 'create/sale',
        component: UploadPhotoComponent,
        children: [
          {path: 'upload', component: UploadPhotoComponent}
        ]
      },
      {path: 'create/project', component: CreateProjectComponent},
      {
        path: 'create/project',
        // component: UploadProjectPhotoComponent,
        children: [
          {path: 'upload/photo', component: UploadProjectPhotoComponent},
          {path: 'upload/video', component: UploadProjectVideoComponent},
          {path: 'upload/map', component: UploadProjectMapComponent},
        ]
      },
      {path: 'manage/list', component: ManagePostComponent},
    ]
  },
  {
    path: 'post/detail',
    component: PostDetailComponent,
    children: [
      {path: 'information', component: InformationComponent},
      {path: 'location', component: LocationComponent}
    ]
  },
  {path: 'search/result', component: SearchingResultComponent},
  {path: 'category/sale', component: CategorySaleComponent},
  {path: 'category/buy', component: CategoryBuyComponent},
  {path: 'category/project', component: ProjectPageComponent},
  {path: 'category/buy/list', component: ListItemComponent},
  {path: 'category/sale/list', component: ListItemComponent},
  {path: 'category/project/list', component: ListItemComponent},
  {path: '**', component: NotFoundErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
