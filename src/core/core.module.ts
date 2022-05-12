import { Module, Global } from '@nestjs/common';
import { BaseRepository } from './repository';

@Global()
@Module({
  imports: [],
  providers: [BaseRepository],
  exports: [BaseRepository],
})
export class CoreModule {}
