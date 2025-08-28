import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AdminComponent } from './components/admin/admin.component';
import { SlideComponent } from './components/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ImageMosaicComponent } from './components/image-mosaic/image-mosaic.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AppComponent,
    GalleryComponent,
    HeaderComponent,
    FileUploadComponent,
    AdminComponent,
    SlideComponent,
    EditAlbumComponent,
    AlbumListComponent,
    ImageUploadComponent,
    ImageListComponent,
    RegisterComponent,
    ImageMosaicComponent,
    BlogListComponent
  ],
  imports: [
    SpinnerComponent,
    UnauthorizedComponent,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CarouselModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
