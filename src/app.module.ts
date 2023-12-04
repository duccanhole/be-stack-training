import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './module/todos/note.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static'), // added ../ to get one folder back
      serveRoot: '/static/' //last slash was important
    }),
    NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
