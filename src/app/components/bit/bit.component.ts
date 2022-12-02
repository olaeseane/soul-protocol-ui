import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Bit } from '../../core/models/bit.model';

@Component({
  selector: 'sw-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BitComponent implements OnInit {
  @Input() bit: Bit;

  constructor() {}

  ngOnInit(): void {}
}
