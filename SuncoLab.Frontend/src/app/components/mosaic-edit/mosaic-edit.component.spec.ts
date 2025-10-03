import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicEditComponent } from './mosaic-edit.component';

describe('MosaicEditComponent', () => {
  let component: MosaicEditComponent;
  let fixture: ComponentFixture<MosaicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MosaicEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosaicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
