import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { Note, NoteSchema } from './note.schema';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

config();

const AMQP_URL = process.env.AMQP_URL;
export const RABBITMQ_OPT: ClientProviderOptions = {
  name: 'NOTE_SERVICE',
  transport: Transport.RMQ,
  options: {
    urls: [AMQP_URL],
    queue: 'notes_queue',
    queueOptions: {
      durable: false,
    },
  },
};

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
    ClientsModule.register([RABBITMQ_OPT]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
