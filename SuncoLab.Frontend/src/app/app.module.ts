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
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditAlbumComponent } from './components/edit-album/edit-album.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { RegisterComponent } from './components/register/register.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { NgxEditorComponent, NgxEditorMenuComponent, NgxEditorModule } from "ngx-editor";
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MosaicEditComponent } from './components/mosaic-edit/mosaic-edit.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AppComponent,
    GalleryComponent,
    HeaderComponent,
    FileUploadComponent,
    AdminComponent,
    CarouselComponent,
    EditAlbumComponent,
    AlbumListComponent,
    ImageUploadComponent,
    ImageListComponent,
    RegisterComponent,
    MosaicComponent,
    BlogListComponent,
    CreateBlogComponent,
    BlogPreviewComponent,
    MosaicEditComponent,
    AboutComponent,
    FooterComponent
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
    MatSlideToggleModule,
    NgxEditorModule,
    NgxEditorMenuComponent,
    NgxEditorComponent
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
