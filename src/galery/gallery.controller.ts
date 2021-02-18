import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./config";
import { GalleryService } from "./gallery.service";
import { ParseIntPipe } from "@nestjs/common/pipes/parse-int.pipe";

@Controller('upload')
export class GalleryController{

  constructor(
    private readonly galleryService:GalleryService,
  ){}

    @Get(':id')
    async getOneImage(@Param('id', ParseIntPipe) id:number){
      const data= await this.galleryService.getOne(id);
      return {
          message:"Imagen Cargada",
          data:data
      }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file', null,multerOptions))
    async uploadFile(@UploadedFiles() file:any , @Req() req:any, @Body("id") id:number) {
      
     const image = await this.galleryService.createProfileImage(id,req);
     return {
       message:"Datos imagen profile",
       data:image
     }

    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') file:any,
    @Res() res:any) {
      return res.sendFile(file, {root: 'uploads' });
    }

    @Put()
    @UseInterceptors(FilesInterceptor('file', null,multerOptions))
    async updateProfileImage(@UploadedFiles() file:any , @Req() req:any, @Body("id") id:number) {
      
     const image = await this.galleryService.createProfileImage(id,req);

     return {
       message:"Datos imagen profile",
       data:image
     }
    }

    
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
        const data= await this.galleryService.deleteOne(id);  
        return {
            message:"Imagen de perfil Eliminado",
            data:data
        }
    }

}