
import { AxiosResponse } from 'axios';

export type AmountToken = {
  amount: number;
  quantity: number;
  currency: string;
};

export type HttpServerResponse = AxiosResponse | false;

export type NextImage = {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  loading?: "lazy" | "eager";
  lazyBoundary?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string | "right top" | "center top" | "left top" | "right" | "center" | "left" | "right bottom" | "center bottom" | "left bottom" | "inherit" | "initial" | "revert" | "unset";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  unoptimized?: boolean;
};
