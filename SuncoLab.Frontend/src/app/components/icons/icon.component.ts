// icon.component.ts

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() name!: string;

  @HostBinding('class')
  hostClass = '';
}

