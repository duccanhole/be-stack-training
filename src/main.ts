import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.connectMicroservice<MicroserviceOptions>(
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'notes_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );

  // app.use('/static', express.static(join(__dirname, '..', 'static')));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  console.log('server is running on port: ' + (await app.getUrl()));
}
bootstrap();
