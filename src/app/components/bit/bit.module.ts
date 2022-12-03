import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitComponent } from './bit.component';
import { BitParamModule } from '../bit-param/bit-param.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiIslandModule, TuiLineClampModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [BitComponent],
  exports: [BitComponent],
  imports: [
    CommonModule,
    BitParamModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiIslandModule,
    TuiLineClampModule,
  ],
})
export class BitModule {}
