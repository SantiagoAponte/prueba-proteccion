import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities';

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Gallery)
        private readonly galleryRepository:Repository<Gallery>,
    ){}

    async getOne(id:number){
        const imgData= await this.galleryRepository.findOne(id);
        if(!imgData) throw new NotFoundException();
        return imgData; 
    }
    async createProfileImage(id:number, imgNew:any){
        let imgData;
        const ancho = 1123;
        const alto = 796;
        const imgDataUser=await this.galleryRepository.findOne(id);
        imgNew['files'].map((data:any)=>imgData=data);
        console.log(imgNew);
        const ratio = 796/ancho;
        console.log(imgNew.height);
        const Newalto = alto*ratio;
        console.log(Newalto, ratio);
        if(ancho > alto){
            console.log('Horizontal');
        }
        if(alto > ancho){
            console.log('Vertical');
        }
        if(!imgDataUser) throw new NotFoundException('Imagen del perfil de usuario no existe')
        const editedProfile= await Object.assign(imgDataUser,imgData);
        return await this.galleryRepository.save(editedProfile);

    }

    async updateProfileImage(id:number, file:any){
        const imgData= this.galleryRepository.findOne(id);
        return imgData;

    }  

    async deleteOne(id:number){
        console.log(id);
        const imgData = await this.galleryRepository.findOne(id);
        console.log(imgData);
        if(!imgData) throw new NotFoundException();
        return await this.galleryRepository.remove(imgData);
    }

    async resize(buffer, options: {width?: number, height?: number} = { width: 50, height: 50 }) {
        
    }
}