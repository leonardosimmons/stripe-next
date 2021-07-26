
import { AxiosResponse } from 'axios';

export type AmountToken = {
  amount: number;
  quantity: number;
  currency: string;
};

export type HttpServerResponse = AxiosResponse | false;
