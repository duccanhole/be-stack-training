import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import T from '@elastic/elasticsearch/lib/api/types';
import TB from '@elastic/elasticsearch/lib/api/typesWithBodyKey';
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

  @Get('/find')
  async findDocument(@Query() q: T.SearchRequest | TB.SearchRequest) {
    return await this.searchService.search(q);
  }

  @Post('/index')
  async indexDocument(@Body() payload: T.IndexRequest | TB.IndexRequest) {
    return await this.searchService.index(payload);
  }

  @Put('/update')
  async updateDocument(@Body() payload: T.UpdateRequest | TB.UpdateRequest) {
    return await this.searchService.update(payload);
  }

  @Delete('/delete')
  async deleteDocumentQuery(@Query() q: T.DeleteByQueryRequest | TB.DeleteByQueryRequest){
    return await this.searchService.removeByQuery(q)
  }

  @Delete('/delete/:index/:id')
  async deleteDocumentId(@Param('index') index: string, @Param('id') id: string) {
    return await this.searchService.removeById(index, id);
  }
}
