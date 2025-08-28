import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMosaicComponent } from './image-mosaic.component';

describe('ImageMosaicComponent', () => {
  let component: ImageMosaicComponent;
  let fixture: ComponentFixture<ImageMosaicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageMosaicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMosaicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
