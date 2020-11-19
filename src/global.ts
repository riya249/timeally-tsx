import { ethers } from 'ethers';
import {
  NrtManager,
  TimeAllyManager,
  ValidatorManager,
  PrepaidEs,
  Tsgap,
  TimeAllyPromotionalBucket,
  PetLiquidFundsBucket,
  PetLiquidTimeAllyPet,
  DayswappersWithMigration,
  PetPrepaidTimeAllyPet,
} from 'eraswap-sdk/dist/typechain/ESN';

import { CustomProvider } from 'eraswap-sdk';

declare global {
  interface Window {
    wallet: ethers.Wallet |undefined;
    nrtManagerInstance: NrtManager;
    timeallyManagerInstance: TimeAllyManager;
    validatorManagerInstance: ValidatorManager;
    prepaidEsInstance: PrepaidEs;
    timeallyPromotionalBucketInstance: TimeAllyPromotionalBucket;
    dayswappersInstance: DayswappersWithMigration;
    ethereum: ethers.providers.ExternalProvider;
    provider: CustomProvider;
    tsgapLiquidInstance: Tsgap;
    petInstance: PetPrepaidTimeAllyPet,
    petFundsInstance: PetLiquidFundsBucket,
    returnLocationAfterLoadWallet: any
  }
}
