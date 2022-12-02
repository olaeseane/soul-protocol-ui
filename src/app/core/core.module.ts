import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CoreState } from './state/core.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([CoreState], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
})
export class CoreModule {}
