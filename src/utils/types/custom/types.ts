
import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';

export type AmountToken = {
  amount: number;
  quantity: number;
  currency: string;
};

export type Button = {
  text:  string | number | JSX.Element | HTMLElement;
  link: string;
  classes?: string;
  type?: "button" | "submit" | "reset";
  clicked?: () => void;
};

export type Combinable = string | number;

export type Data<T> = {
  message: string;
  payload: T;
};

export type HttpServerResponse = AxiosResponse | false;

export type ContextProps<T, U> = {
  state: T;
  dispatch: Dispatch<U>;
};

export type NextImage = {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  layout?: "fixed" | "intrinsic" | "responsive";
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

export type StaticPath = {
  params: {
    id?: string;
    slug?: string;
  };
};

//** --------------------  STATE  -------------------- **//
export type Demo = {
  paymentType: PaymentType;
  selectedProducts: Array<number>;
  total: number;
}


//** -------------------  PAYMENT  ------------------- **//
export type PaymentType = "once" | "monthly" | "yearly";


//** -------------------  PRODUCT  ------------------- **//
export type Product = {
  meta: {
    id: number;
    slug: string;
  };
  details: {
    type: string;
    style: string;
    name: string;
    price: number;
    desc: string;
    list: Array<string>;
  };
  preview: {
    image: NextImage;
    link: string;
  };
};

export type ProductCard = {
  id: number;
  img: NextImage;
  text: string;
  btn: Button;
  price: number;
};

export type ProductCartToken = {
  user: Partial<UserContext>;
  product: Product;
  order: {
    id: number;
    size: string;
    quantity: number;
  };
};

//** -------------------  USER  -------------------- *//
export type UserInfo = {
  name: string;
  email: string;
  image: string;
  password?: string;
};

export type UserContext = {
  id: Combinable;
  info: UserInfo;
  status: {
    isSignedIn: boolean;
    isError: boolean;
  };
};