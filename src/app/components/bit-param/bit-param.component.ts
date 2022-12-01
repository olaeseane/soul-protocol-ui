import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'sw-bit-param',
  templateUrl: './bit-param.component.html',
  styleUrls: ['./bit-param.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BitParamComponent implements OnInit {
  @Input() name = 'param';
  @Input() value = 'unknown';

  constructor() {}

  ngOnInit(): void {}
}
