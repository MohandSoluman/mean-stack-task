export interface IUser {
  id: string;
  name: string;
  code: number;
  startName: string;
  address: string;
  bankList: BankList[];
}

export interface BankList {
  id: string;
  branch: string;
  accountNumber: string;
  glAccountCode: string;
  glAccountName: string;
  iban: any;
  currency: any;
  currentBalance: string;
  userPermission: string;
  openingBalance: string;
}
