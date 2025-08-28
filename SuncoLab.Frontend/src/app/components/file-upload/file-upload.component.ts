import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
     @Output() filesChanged = new EventEmitter<Array<File>>();

      formData: FormData = new FormData();
      files: Array<File> = [];
      
      onFileChange() {
        this.filesChanged.emit(this.files);
      }

      onFileSelected(event: any) {
        let file: File = event.target.files[0];

        if (file) {
  	        this.files.push(file);
            this.updateFormDate();
        }

        this.onFileChange();
      }

      deleteFile(file: File) {
        this.files = this.files.filter(f => f.name != file.name);
        this.updateFormDate();
      }

      updateFormDate() {
        this.formData = new FormData();
        for (const file of this.files) {
          this.formData.append('files', file, file.name);
        }
        console.log(JSON.stringify(this.formData))
      }

      public getFormData(): FormData {
        return this.formData;
      }

      public reset() {
        this.formData = new FormData();
        this.files = new Array<File>();
    }
}
