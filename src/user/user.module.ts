import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryModule } from 'src/galery/gallery.module';
import { User } from './entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const entityUser = TypeOrmModule.forFeature([User]);

@Module({
  imports:[
    entityUser,
    GalleryModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
