import { Controller, Get, Post, Query } from '@nestjs/common';
import { SearchRequest as TSearchRequest } from '@elastic/elasticsearch/lib/api/types';
import { SearchRequest as TBSearchRequest } from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  getController() {
    return 'elastic search';
  }

  @Get('/info')
  async getInfor() {
    return await this.searchService.getInfo();
  }

  @Get('/query')
  querySearch(@Query() q: TSearchRequest | TBSearchRequest) {
    return this.searchService.search(q);
  }

  @Post('/index')
  indexData() {
    return 'index';
  }
}
