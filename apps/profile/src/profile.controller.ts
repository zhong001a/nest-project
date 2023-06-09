import { Body, Controller, Get, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  createProfile(@Body() createProfile: CreateProfileDto, @CurrentUser() user: UserDto) {

    const name = createProfile.firstName + createProfile.lastName

    return this.profileService.createProfile(createProfile, name, user._id, user.email)
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: UserDto) {
    return this.profileService.getUserProfile(user._id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUserProfile() {
    return this.profileService.getAllUserProrifles()
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateProfile(@Body() updateProfile: UpdateProfileDto, @CurrentUser() user: UserDto) {
    return this.profileService.updateProfile(user._id, updateProfile)

  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteProfile(@CurrentUser() user: UserDto){
    return this.profileService.deleteProfile(user._id)
  }


}
