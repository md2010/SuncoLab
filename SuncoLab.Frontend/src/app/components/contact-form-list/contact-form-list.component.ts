import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactForm, ContactFormFilter } from '../../models/form';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PublicFormService } from '../../services/public-form/public-form.service';

@Component({
  selector: 'app-contact-form-list',
  standalone: false,
  templateUrl: './contact-form-list.component.html',
  styleUrl: './contact-form-list.component.css'
})
export class ContactFormListComponent implements OnInit {
  data = new MatTableDataSource<any>();
  displayedColumns = ['dateCreated', 'firstName', 'lastName', 'email', 'resolved'];

  total = 0;
  pageIndex = 0;     
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: PublicFormService) {}
  
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    let filter = new ContactFormFilter(this.pageIndex + 1, this.pageSize);
    filter.resolved = true;

    this.service.getContactForms(filter)
    .subscribe({
      next: (response) => {
        this.data.data = response.items;
        this.total = response.count;
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.getData();
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }
}
