import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Response } from 'express';
import { IsString, IsNotEmpty } from 'class-validator';

class FormDataDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}

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
          results: data,
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

  @Post('/create')
  @HttpCode(200)
  async createNewNote(@Body() data: FormDataDTO, @Res() r: Response) {
    try {
      const results = await this.noteService.create(data.title);
      r.send({
        results,
      });
    } catch (e) {
      r.send({
        error: e,
      });
    }
  }

  @Put('/update/:noteId')
  @HttpCode(200)
  async updateNote(
    @Body() data: FormDataDTO,
    @Param('noteId') id: string,
    @Res() r: Response,
  ) {
    try {
      const results = await this.noteService.update(id, data.title);
      // BUG: the result is not match the data update
      if (results)
        r.send({
          results,
        });
      else
        r.status(404).send({
          message: 'Not Found',
        });
    } catch (e) {
      r.status(500).send({
        error: e,
      });
    }
  }

  @Delete('/delete/:noteId')
  @HttpCode(200)
  async remove(@Param('noteId') id: string, @Res() r: Response) {
    try {
      const docs = await this.noteService.remove(id);
      if (docs)
        r.send({
          results: 'success',
        });
      else
        r.status(404).send({
          message: 'Not Found',
        });
    } catch (e) {
      r.status(500).send({
        error: e,
      });
    }
  }
}
