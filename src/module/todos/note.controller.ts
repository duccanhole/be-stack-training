import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { NoteService } from './note.service';
import { Response } from 'express';

// class FormDataDTO {
//   title: string
// }

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/get')
  async getNotes(@Query() q, @Res() r: Response) {
    const skip = parseInt(q.skip);
    const limit = parseInt(q.limit);
    r.send({
      results: await this.noteService.get(skip, limit),
    });
  }

  @Get('/get/:noteId')
  async getNotesDetail(@Param('noteId') id: string, @Res() r: Response) {
    try {
      const data = await this.noteService.getDetail(id);
      if (!data) {
        r.status(404).send({
          message: 'Not Found',
        });
      } else {
        r.send({
          results: await this.noteService.getDetail(id),
        });
      }
    } catch (error) {
      r.send({
        error,
      });
    }
  }

  @Get('/load-xls-data')
  async loadXlsFile(@Res() r: Response) {
    r.send({
      results: this.noteService.load(),
    });
  }
}
