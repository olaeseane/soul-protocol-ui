import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import type { provider } from 'web3-core';
import { WEB3 } from '../web3';
import { ethers } from 'ethers';
import { ABI_CONTRACT } from '../contracts/contract';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3Modal;
  web3js: any;
  walletProvider: provider | undefined;
  accounts: string[] | undefined;
  contract: any;

  provider = new ethers.providers.JsonRpcProvider(
    'https://matic-mumbai.chainstacklabs.com'
  );
  mumbaiAddress = '0xf1a366d16686ca5df7d86aa49b40dbeac8a7409c';

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

    this.contract = new ethers.Contract(
      this.mumbaiAddress,
      ABI_CONTRACT,
      this.provider
    );

    return this.accounts;
  }

  getContract() {
    return this.contract;
  }
}
