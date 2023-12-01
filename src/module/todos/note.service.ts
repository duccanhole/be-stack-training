import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.schema';
import { Model } from 'mongoose';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name, 'db') private noteModel: Model<NoteDocument>,
  ) {}

  async get() {
    return await this.noteModel.find().exec();
  }
}
