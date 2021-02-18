import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GalleryService } from 'src/galery/gallery.service';
import { CreateGaleryDto } from '../galery/dtos';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userService:UserService,
        private readonly galleryService:GalleryService,
        ){}
    
    @Get()
    async getMany(){
       const data= await this.userService.getMany();
       return {
           message:"Usuarios Cargados",
           data:data
       }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.userService.getOne(id);
       return {
           message:"Usuario Cargado",
           data:data
       }
    }

    @Post()
    async createOne(
        @Body()dtoUser:CreateUserDto,
        @Body("profileImage")dtoGalery:CreateGaleryDto,
        
        ){
        const data= await this.userService.createOne(dtoUser);
        return {  
           message:"Usuario Creado",
           user:data,
        }
    }

    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditUserDto){
       const data= await this.userService.editOne(id,dto);
       return {
           message:"Usuario Editado",
           data:data
       }
    }

    @Delete(':id')
    async deleteOne(@Param('id') id:number){
        const data= await this.userService.deleteOne(id);;
        await this.galleryService.deleteOne(id);
    
        return {
            message:"Usuario Eliminado",
            data:data
        }
    }

}