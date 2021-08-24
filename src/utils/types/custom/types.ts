
import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';

export type AmountToken = {
  amount: number;
  quantity: number;
  currency: string;
};

export type BaseOptions = {
  bgImage?: string;
  classes?: string;
  column?: boolean;
  id?: string | number;
  index?: string | number;
  link?: string;
  main?: boolean;
  parent?: string;
  sub?: string;
  styles?: any;
  toggle?: boolean;
  type?: string;
  uppercase?: boolean;
  value?: any;
  video?: string;
  changed?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clicked?: () => void;
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

export type ProgressStage = "start" | "selection" | "payment" | "shipping" | "completed";

export type StaticPath = {
  params: {
    id?: string;
    slug?: string;
  };
};

//** --------------------  STATE  -------------------- **//
export type DemoContext = {
  paymentType: PaymentType;
  selectedProducts: Array<number>;
  shipping: {
    address: string;
    city: string;
    postal: string;
    state: string;
  }
  total: number;
};

export type DemoStatus = {
  status: 'loading' | 'pending' | 'completed' | 'error';
  stage: ProgressStage;
  error?: string;
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
  checked: boolean;
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