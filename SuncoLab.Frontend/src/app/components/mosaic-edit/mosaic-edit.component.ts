import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { EditMosaicItem, MosaicItem } from '../../models/mosaicItem';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../models/blog';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-mosaic-edit',
  standalone: false,
  templateUrl: './mosaic-edit.component.html',
  styleUrl: './mosaic-edit.component.css'
})
export class MosaicEditComponent  implements OnInit {
  mosaic: MosaicItem[] | undefined = [];  
  itemsToEdit: EditMosaicItem[] = [];
  blogs: Blog[] | undefined;
  showError = false;

  constructor(private homeService: HomeService, private blogService: BlogService, private toast: ToastService) {}

  ngOnInit(): void {
    this.homeService.getMosaic()
      .subscribe(items => {
        this.mosaic = items;
        this.editItem();
      })
   
    this.blogService.getAll()
      .subscribe((response) => {
        this.blogs = response;
      })
  }

  editItem() {
    let i = 6;

    if (this.mosaic) {
      this.mosaic.forEach(element => {
        this.itemsToEdit.push(new EditMosaicItem(element.sortOrder, element.blogId));
      });     
      i = 6 - this.mosaic.length;
    }

    while(i > 0)
    {
      this.itemsToEdit.push(new EditMosaicItem(i))
      i--;
    }

    this.itemsToEdit = this.itemsToEdit.sort((a,b) => a.sortOrder! - b.sortOrder!)
  }

  save(formRef: any) {
    if (formRef.invalid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    
    this.homeService.editMosaic({"items": this.itemsToEdit})
    .subscribe({ 
      next: () => { 
        this.toast.create('Mosaic saved.');
        setTimeout(() => {
           window.location.reload() 
        8000});
      },
      error: () => {
        this.toast.create('Error happend while saving mosaic.', 'error');
      }
    })
  }

}
