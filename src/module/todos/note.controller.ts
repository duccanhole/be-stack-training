import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { NoteService } from './note.service';
import { Response } from 'express';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/get')
  async getNotes(@Query() q, @Res() r: Response) {
    r.send({
      results: await this.noteService.get(),
    });
  }

  @Get('/load-xls-data')
  async loadXlsFile(@Res() r: Response) {
    r.send({
      results: this.noteService.load(),
    });
  }
}
