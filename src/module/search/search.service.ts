import { Client } from '@elastic/elasticsearch';
import { SearchRequest as TSearchRequest } from '@elastic/elasticsearch/lib/api/types';
import { SearchRequest as TBSearchRequest } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
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

  async search(request: TSearchRequest | TBSearchRequest) {
    return await this.client.search(request);
  }
}
