import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { SendBitsComponent } from '../send-bits/send-bits.component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { startWith, takeUntil } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'sw-bits-of-soul-tabs',
  templateUrl: './bits-of-soul-tabs.component.html',
  styleUrls: ['./bits-of-soul-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class BitsOfSoulTabsComponent implements OnInit {
  private readonly dialog = this.dialogService.open<number>(
    new PolymorpheusComponent(SendBitsComponent, this.injector),
    {
      dismissible: true,
      size: 'l',
    }
  );

  activeItemIndex = 0;
  receivedQuantity$ = this.dataService.getReceivedBitsIds().pipe(startWith([]));
  sendQuantity$ = this.dataService.getReceivedBitsIds().pipe(startWith([]));

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly destroy$: TuiDestroyService,
    private readonly dataService: HomeService
  ) {}

  ngOnInit(): void {}

  sendBits() {
    this.dialog.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
