import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('mailer')
export class MailerController {
  constructor() {}
  @EventPattern('note_created')
  onNoteCreated(data) {
    console.log(
      `new note ${data._id} created at ${new Date().toLocaleString()}`,
    );
  }

  @EventPattern('note_updated')
  onNoteUpdated(data) {
    console.log('a note was updated at ' + new Date().toLocaleString());
    console.log(data);
  }

  @EventPattern('note_removed')
  onNoteRemoved(data) {
    console.log(
      `a note with id ${
        data._id
      } was removed at ${new Date().toLocaleString()}`,
    );
  }
}
