import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor( private readonly profileRepository: ProfileRepository){}

  createProfile( createProfile: CreateProfileDto, name: string, userId: string, email: string ){

    return this.profileRepository.create({
      name,
      ...createProfile,
      userId,
      email

    })
  }

  getUserProfile( id: string ){
    return this.profileRepository.findOne({ userId: id })
  }

  getAllUserProrifles(){
    return this.profileRepository.find({})
  }

  async updateProfile( _id: string, updateProfile: UpdateProfileDto){
    return this.profileRepository.findOneAndUpdate(
      {userId:_id},
      {$set: updateProfile}
    )
  }

  deleteProfile( id: string ){
    return this.profileRepository.findOneAndDelete({ userId: id })
  }
}
