import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

config();

const AMQP_URL = process.env.AMQP_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  console.log('connect to: ' + AMQP_URL);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [AMQP_URL],
      queue: 'notes_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
