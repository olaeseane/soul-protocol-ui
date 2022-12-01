import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { BitsOfSoulTabsComponent } from './components/bits-of-soul-tabs/bits-of-soul-tabs.component';
import {
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { ReceivedBitsComponent } from './components/received-bits/received-bits.component';
import { SentBitsComponent } from './components/sent-bits/sent-bits.component';
import { BitModule } from '../../components/bit/bit.module';
import { SoulComponent } from './components/soul/soul.component';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLabelModule,
  TuiModeModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { SendBitsComponent } from './components/send-bits/send-bits.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BitParamModule } from '../../components/bit-param/bit-param.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    BitsOfSoulTabsComponent,
    ReceivedBitsComponent,
    SentBitsComponent,
    SoulComponent,
    SendBitsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TuiTabsModule,
    BitModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    TuiLabelModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiScrollbarModule,
    BitParamModule,
    TuiBadgeModule,
    TuiModeModule,
  ],
})
export class HomeModule {}
