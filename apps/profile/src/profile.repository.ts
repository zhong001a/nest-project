import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common'
import { ProfileDocument } from './models/profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository extends AbstractRepository<ProfileDocument>{
    protected readonly logger = new Logger(ProfileDocument.name);

    constructor(
        @InjectModel(ProfileDocument.name) profileModel: Model<ProfileDocument>,
    ){
        super(profileModel)
    }

}