import { Controller, Get, Query, Res } from '@nestjs/common';
import { NoteService } from './note.service';
import { Response } from 'express';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getNotes(@Query() q, @Res() r: Response) {
    r.send({
      results: await this.noteService.get(),
    });
  }
}
