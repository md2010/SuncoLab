import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { BlogService } from '../../services/blog/blog.service';
import { ToastService } from '../../services/toast/toast.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-edit-blog',
  standalone: false,
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent {
@ViewChild(FileUploadComponent) fileUploader!: FileUploadComponent;
  editor: Editor = new Editor();
  editBlogForm!: FormGroup;
  formData!: FormData;
  file?: File;
  showError = false;
  loaded = false;
  uploadNewCoverImage = false;
  blogId : string;
  blog : Blog | undefined;

  constructor (
    private formBuilder: FormBuilder, 
    private blogService: BlogService, 
    private toast: ToastService,
    private route: ActivatedRoute) {
      this.blogId = this.route.snapshot.paramMap.get('id')!;

      this.blogService.getById(this.blogId)
        .subscribe((blog) => {
          this.blog = blog;
          this.populateForm();
        })
  }

  createBlog(): void {   
    if (this.editBlogForm.invalid) {
        this.showError = true;
        return;
    } 

    this.showError = false;
    this.formData.append('name', this.editBlogForm.value.name);
    this.formData.append('author', this.editBlogForm.value.author);
    this.formData.append('show', this.editBlogForm.value.show);
    this.formData.append('description', this.editBlogForm.value.description ?? '');
    this.formData.append('html', this.editBlogForm.value.html);
    if (this.file) {
      this.formData.append('coverImage', this.file);
    }
    
    this.blogService.editBlog(this.blogId, this.formData)
    .subscribe({
      next: () => { 
        this.toast.create('Blog updated successfully.');
        setTimeout(() => {
           window.location.reload() 
        8000});
      },
      error: () => {
        this.toast.create('Something went wrong.', "error");
        this.formData = new FormData(); 
        this.file = undefined;
      }
    })
  } 

  delete() {
    this.blogService.delete(this.blogId)
    .subscribe({
      next: () => {
        this.toast.create("Blog deleted succesfully. Blog may be connected to mosaic item.")
        setTimeout(() => {
          const url = `${window.location.origin}/admin`;
          window.open(url, "_self"); 
        8000});
      }
    })
  }

  onFileChanged(files: File[]) {
      this.file = files[0];
    }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  populateForm(): void {
    this.editBlogForm = this.formBuilder.group({
      name: [this.blog?.name, Validators.required],
      author: [this.blog?.author, Validators.required],
      description: this.blog?.description,
      show: new FormControl(this.blog?.show),
      html: [this.blog?.body, Validators.required]
    });

    this.formData = new FormData();
    this.loaded = true;
  }
}

