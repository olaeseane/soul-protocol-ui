import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitComponent } from './bit.component';
import { BitParamModule } from '../bit-param/bit-param.module';

@NgModule({
  declarations: [BitComponent],
  exports: [BitComponent],
  imports: [CommonModule, BitParamModule],
})
export class BitModule {}
