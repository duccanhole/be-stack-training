import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  providers: [],
})
export class MailerModule {}
