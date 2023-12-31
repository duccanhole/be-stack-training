import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.schema';
import { Model } from 'mongoose';
import { join } from 'path';
import { RABBITMQ_OPT } from './note.module';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';

const xlsx = require('xlsx');

interface XlsData {
  Timestamp: number;
  Title: string;
}
@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name, 'db') private noteModel: Model<NoteDocument>
  ) {
  }

  async get(skip: number = 0, limit: number = 10) {
    try {
      return await this.noteModel.find().skip(skip).limit(limit).exec();
    } catch (e) {
      return [];
    }
  }

  async getDetail(_id: string) {
    const document = await this.noteModel.findById(_id).exec();
    if (!document) {
      return null;
    } else return document;
  }

  async create(title: string) {
    const res = await this.noteModel.create({
      timestamp: new Date().toISOString(),
      title,
    });
    return res;
  }

  async update(_id: string, title: string) {
    await this.noteModel.findByIdAndUpdate(_id, {
      title,
      timestamp: new Date().toISOString(),
    });
    const res = await this.noteModel.findById(_id);
    return (await this.noteModel.findById(_id)) ?? null;
  }

  async remove(_id) {
    const res = await this.noteModel.findByIdAndDelete(_id).exec();
    return res ?? null;
  }

  load() {
    try {
      const folderPath = join(__dirname, '..', '..', '..', 'static');
      const xlsPath = join(folderPath, 'dataset.xls');
      const workbook = xlsx.readFile(xlsPath);
      const worksheet = workbook.Sheets['Reading Habit Analysis Article'];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  }

  async insertXlsToMongoDB(xlsJsonData: Array<XlsData>) {
    await this.noteModel.insertMany(
      xlsJsonData.map((i) => ({
        timestamp: new Date(i.Timestamp).toISOString(),
        title: i.Title,
      })),
    );
  }
}
