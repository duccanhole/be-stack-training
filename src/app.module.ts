import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './module/todos/note.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

config();

// const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;
const DB_CONNECTION = process.env.DB_CONNECTION;

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL, {
      connectionName: DB_CONNECTION,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static'), // added ../ to get one folder back
      serveRoot: '/static/', //last slash was important
    }),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
