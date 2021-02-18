import { Module } from '@nestjs/common'
import { GalleryModule } from './galery/gallery.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        UserModule,
        GalleryModule,
    ],
})
export class Modules { }