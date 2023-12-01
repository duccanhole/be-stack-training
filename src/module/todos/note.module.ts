import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Note.name,
          schema: NoteSchema,
        },
      ],
      'db',
    ),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
