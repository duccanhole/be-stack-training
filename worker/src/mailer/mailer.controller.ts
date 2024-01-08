import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SearchService } from '../../../src/module/search/search.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly searchService: SearchService) {}
  @EventPattern('note_created')
  async onNoteCreated(data) {
    console.log(
      `new note ${data._id} created at ${new Date().toLocaleString()}`,
    );
    await this.searchService.index({
      index: 'search-todos',
      document: data
    })
    console.log('sync data with elastic: created');
  }

  @EventPattern('note_updated')
  async onNoteUpdated(data) {
    console.log(`a note ${data._id} was updated at ` + new Date().toLocaleString());
    console.log(data);
    const docs = await this.searchService.search({
      index: 'search-todos',
      query: {
        match: {
          _id: data._id
        }
      }
    })
    if(docs.hits.hits.length > 0) {
      await this.searchService.update({
        index: 'search-todos',
        id: docs.hits.hits[0]._id,
        doc: data
      })
    }
    console.log('sync data with elastic: updated');
  }

  @EventPattern('note_removed')
  async onNoteRemoved(data) {
    console.log(
      `a note with id ${
        data._id
      } was removed at ${new Date().toLocaleString()}`,
    );
    await this.searchService.removeByQuery({
      index: 'search-todos',
      query: {
        match: {
          _id: data._id
        }
      }
    })
    console.log('sync data with elastic: removed');
  }
}
