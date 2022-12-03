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

  getBitImageUrl(bit: Bit): string {
    const result =
      'https://gateway.pinata.cloud/ipfs/' + bit.image.split('//')[1];

    // const result =
    //   'https://bafybeifxirgkfmy2rnblam3nhfhareulz7lkqyssdqu6rqkm4mumlpksae.ipfs.dweb.link/nascent/' +
    //   bit.image.slice(-9);

    // ipfs://Qmag3irqBk2iKNTJuJrD1yEeaygCkD1yRFRnivyPQzTtiC/nascent/11110.png

    return result;
  }
}
