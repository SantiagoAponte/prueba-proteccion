import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {

    
constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,

){}

async getMany():Promise<User[]>{
    return await this.userRepository.find(); 
}

async getOne(id:number){
    const user= await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException();
    return user; 
}

async createOne(dto:CreateUserDto){
    const name = await this.userRepository.findOne({name: dto.name});
    if(name) throw new BadRequestException('Usuario ya se encuentra registrado con este documento')
    const newUser= await this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    delete user.profileImage;
    return user;

}

async editOne(id:number, dto:EditUserDto){
    const user = await this.userRepository.findOne(id);
    const name = await this.userRepository.findOne({name: dto.name});
    if(!name) throw new BadRequestException('Usuario con este documento no existe')
    if(!user) throw new NotFoundException('Usuario no existe')
    const editUser= Object.assign(user,dto);
    const editedUser = await this.userRepository.save(editUser);
    return editedUser;
}

async deleteOne(id:number){
    console.log(id);
    const user = await this.userRepository.findOne(id);
    console.log(user);
    if(!user) throw new NotFoundException();
    return await this.userRepository.remove(user);
}


}
