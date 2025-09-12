import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { BlogService } from '../../services/blog/blog.service';
import { ToastService } from '../../services/toast/toast.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-create-blog',
  standalone: false,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnDestroy {
  @ViewChild(FileUploadComponent) fileUploader!: FileUploadComponent;
  editor: Editor = new Editor();
  createBlogForm!: FormGroup;
  formData!: FormData;
  file!: File;

  constructor (private formBuilder: FormBuilder, private blogService: BlogService, private toast: ToastService) {
     this.createBlogForm = this.formBuilder.group({
      name: null,
      description: null,
      show: new FormControl(true),
      html: '<p>Hello World!</p>'
    });
    this.formData = new FormData();
  }

  createBlog(): void {
    this.formData.append('name', this.createBlogForm.value.name);
    this.formData.append('show', this.createBlogForm.value.show);
    this.formData.append('description', this.createBlogForm.value.description);
    this.formData.append('html', this.createBlogForm.value.html);
    this.formData.append('coverImage', this.file);

    this.blogService.createBlog(this.formData)
    .subscribe((result) => {
      if (result) {
         this.toast.create('Blog created successfully.');
      }
    })
  } 

  onFileChanged(files: File[]) {
      this.file = files[0];
    }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
