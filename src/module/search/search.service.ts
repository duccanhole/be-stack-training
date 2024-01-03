import { Client } from '@elastic/elasticsearch';
import T from '@elastic/elasticsearch/lib/api/types';
import TB from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

const ELASTIC_URL = process.env.ELASTIC_URL;
const ELASTIC_AUTH_USER = process.env.ELASTIC_AUTH_USER;
const ELASTIC_AUTH_PASSWORD = process.env.ELASTIC_AUTH_PASSWORD;

@Injectable()
export class SearchService {
  private readonly client: Client;
  constructor() {
    this.client = new Client({
      node: ELASTIC_URL,
      auth: {
        username: ELASTIC_AUTH_USER,
        password: ELASTIC_AUTH_PASSWORD,
      },
    });
  }

  async getInfo() {
    return await this.client.info();
  }

  async search(request: T.SearchRequest | TB.SearchRequest) {
    return await this.client.search(request);
  }

  async index(request: T.IndexRequest | TB.IndexRequest) {
    return await this.client.index(request);
  }

  async update(request: T.UpdateRequest | TB.UpdateRequest) {
    return await this.client.update(request);
  }

  async remove(index: string, id: string) {
    return await this.client.delete({
      index,
      id,
    });
  }
}
