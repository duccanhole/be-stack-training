import { Module } from '@nestjs/common';
import { MailerModule } from './src/mailer/mailer.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [MailerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
