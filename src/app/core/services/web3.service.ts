import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import type { provider } from 'web3-core';
import { WEB3 } from '../web3';
import { ethers } from 'ethers';
import { ABI_CONTRACT } from '../contracts/contract';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  myWalletAddress$ = new BehaviorSubject<string | null>(
    window.ethereum as string | null
  );

  web3Modal;
  web3js: any;
  walletProvider: provider | undefined;
  accounts: string[] | undefined;

  provider = new ethers.providers.JsonRpcProvider(
    'https://matic-mumbai.chainstacklabs.com'
  );
  address = '0x8F4a7f404d09Fea7A9A6c1c9E99a9F341D3DD9A6';

  constructor(@Inject(WEB3) private readonly web3: Web3) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'env', // required change this with your own infura id
          description: 'Scan the qr code and sign in',
          qrcodeModalOptions: {
            mobileLinks: ['metamask'],
          },
        },
      },
      injected: {
        display: {
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
          name: 'metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'mainnet', // optional change this with the net you want to use like rinkeby etc
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });
  }

  async connectAccount() {
    this.walletProvider = await this.web3Modal.connect(); // set provider
    if (this.walletProvider) {
      this.web3js = new Web3(this.walletProvider);
    } // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    if (this.accounts) {
      this.myWalletAddress$.next(this.accounts[0]);
    }

    return this.accounts;
  }

  getContract() {
    return new ethers.Contract(this.address, ABI_CONTRACT, this.provider);
  }
}
