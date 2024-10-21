import {
  ICreateAPI,
  ICreateDTO,
  IDestroyAPI,
  IDestroyDTO,
  IListAPI,
  IListDTO,
  IUpdateAPI,
  IUpdateDTO,
} from '@interfaces/dtos';
import api from '@services/api';

export interface IClients {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatClients {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ICreatClients {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export const createClientAPI = ({
  name,
  salary,
  companyValuation,
}: ICreateDTO<ICreatClients>): ICreateAPI<ICreatClients> =>
  api.post('users', {
    name,
    salary,
    companyValuation,
  });

export const listClientsAPI = ({
  page = 1,
  perPage = 10,
}: IListDTO): IListAPI<IClients, 'clients'> =>
  api.get('users', {
    params: {
      page,
      limit: perPage,
    },
  });

export const deleteClientAPI = ({ id }: IDestroyDTO): IDestroyAPI => {
  return api.delete(`users/${id}`);
};

export const updateClientAPI = ({
  id,
  name,
  salary,
  companyValuation,
}: IUpdateDTO<IClients>): IUpdateAPI<IClients> => {
  return api.patch(`users/${id}`, {
    name,
    salary,
    companyValuation,
  });
};
