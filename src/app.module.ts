import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './module/todos/note.module';

config();

const DB_PASSWORD = process.env.DB_PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://duccanhole:${DB_PASSWORD}@cluster0.kz05mst.mongodb.net/?retryWrites=true&w=majority`,
      {
        connectionName: 'db',
      },
    ),
    NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
