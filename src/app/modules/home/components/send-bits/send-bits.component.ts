import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  FAMILIARITY_LIST,
  LIKING_LIST,
  SOLIDITY_LIST,
} from '../../../../core/constants/bits-params';
import {
  Familiarity,
  Liking,
  Shine,
  Solidity,
} from '../../../../core/models/bit.model';
import { SendBitsService } from './services/send-bits.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetSentBitsIds } from '../../store/home.actions';
import {ethers} from "ethers";

export interface MintBitsParams {
  to: string;
  familiarity: Familiarity;
  liking: Liking;
  solidity: Solidity;
  shine: Shine;
}

@Component({
  selector: 'sw-send-bits',
  templateUrl: './send-bits.component.html',
  styleUrls: ['./send-bits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendBitsComponent implements OnInit {
  readonly bitForm = new UntypedFormGroup({
    to: new UntypedFormControl(``, Validators.required),
    familiarity: new UntypedFormControl(null, Validators.required),
    liking: new UntypedFormControl(null, Validators.required),
    solidity: new UntypedFormControl(null, Validators.required),
    shine: new UntypedFormControl('empty', Validators.required),
  });

  familiarityList = FAMILIARITY_LIST;
  likingList = LIKING_LIST;
  solidityList = SOLIDITY_LIST;
  isLoading$: any = new BehaviorSubject(false);

  constructor(
    private readonly sendBitsService: SendBitsService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, void>,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  onSend() {
    this.sendBitsService.sendBit(this.bitForm.value).subscribe();
    this.isLoading$.next(true);

    setTimeout(() => {
      this.context.completeWith();
      this.isLoading$.next(false);
      this.store.dispatch(new GetSentBitsIds());
    }, 3000);
  }
}
