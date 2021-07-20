

import axios, { 
  AxiosInstance,
  AxiosResponse, 
  CancelToken, 
  CancelTokenSource } from 'axios';


interface HttpControllerInterface {
  get: (url: string) => Promise<any>;
  post<T>(url: string, data: T, token: string): Promise<AxiosResponse | false>;
  put<T>(url: string, data: T): Promise<AxiosResponse | false>;
  remove: (url: string, data?: any) => Promise<AxiosResponse | false>;
  signInUser: (u_id: number) => Promise<any>;
};


class HttpController implements HttpControllerInterface
{
  private _buffer: any;
  private _conn: AxiosInstance;
  private _source: CancelTokenSource;
  private _cancelToken: CancelToken;

  constructor(token?: string) {
    this._buffer;
    this._conn = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API as string,
      headers: { 'auth-token': `Bearer ${token}` }
    });
    this._source = axios.CancelToken.source();
    this._cancelToken = this._source.token;
  };

  get result() {
    return this._buffer;
  };

  get source() {
    return this._source;
  }

  get cancelToken() {
    return this._cancelToken;
  }

  public async get(url: string): Promise<any> {
    try {
      const res: AxiosResponse<any> = await this._conn({ method: 'get', url });
      const data: HttpResponse = res.status === 200 && res.data;

      this._buffer = data.payload;
      return data.payload;
    }
    catch(err) {
      console.log(err);
      throw new Error(err);
    }
  };

  public async post<T>(url: string, data: T): Promise<AxiosResponse | false> {
    try {
      const res: AxiosResponse<any> = await this._conn({ method:'post', url, data: {...data} });
      const response: AxiosResponse | false = res.status === 200 ? res : res.status === 201 ? res : false;
      
      this._buffer = response;
      return response;
    }
    catch(err) {
      console.log(err);
      throw new Error(err);
    }
  };

  public async put<T>(url: string, data: T): Promise<AxiosResponse | false> {
    try {
      const res: AxiosResponse<any> = await this._conn({ method: 'put', url, data });
      const response: AxiosResponse | false = res.status === 200 ? res : false;
      
      this._buffer = response;
      return response;
    }
    catch(err) {
      console.log(err);
      throw new Error(err);
    }
  };

  public async remove(url: string, data?: any): Promise<AxiosResponse | false> {
    try {
      const res: AxiosResponse<any> = await this._conn.delete(url, { params: {...data}});
      const response: AxiosResponse | false = res.status === 200 ? res : false;
  
      this._buffer = response;
      return response;
    }
    catch(err) {
      console.log(err);
      throw new Error(err);
    }
  };

  public async signInUser(u_id: number): Promise<any> {
    try {
      const api: string = '/sign-in';
      const res: AxiosResponse | false = await this.put(process.env.NEXT_PUBLIC_USER_API as string + api, {u_id});
      
      if (res) {
        const response: HttpResponse = res.status === 200 ? res.data : false;

        this._buffer = response.payload;
        return response.payload;
      }
    }
    catch(err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export { HttpController };
