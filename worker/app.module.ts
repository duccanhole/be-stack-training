import { Module } from '@nestjs/common';
import { MailerModule } from './src/mailer/mailer.module';
import { SearchModule } from './src/search/search.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [MailerModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
