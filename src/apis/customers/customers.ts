import { APIResponse } from '@interfaces/axios-response.dto';
import { ICreateAPI, ICreateDTO, IListAPI, IListDTO } from '@interfaces/dtos';
import api from '@services/api';

export interface ICustomer {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface IListCustomer {
  clients: ICustomer[];
}

export interface ICreatCustomer {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ICreatCustomer {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export const createCustomerAPI = ({
  name,
  salary,
  companyValuation,
}: ICreateDTO<ICreatCustomer>): ICreateAPI<ICreatCustomer> =>
  api.post('users', {
    name,
    salary,
    companyValuation,
  });

export const listCustomersAPI = ({
  page = 1,
  perPage = 10,
}: IListDTO): IListAPI<ICustomer, 'clients'> =>
  api.get('users', {
    params: {
      page,
      limit: perPage,
    },
  });
