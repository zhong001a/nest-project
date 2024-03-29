import { Injectable,Inject } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs'

@Injectable()
export class ReservationsService {

  constructor(
    private readonly reservationRespository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ){}

  async create(createReservationDto: CreateReservationDto, userId: string) {

    return createReservationDto.charge
    return this.paymentService
    .send('create_charge',  createReservationDto.charge)
    .pipe(
      map((res)=>{
        return this.reservationRespository.create({
          ...createReservationDto,
          invoiceId: res.id,
          timestamp:new Date(),
          userId,
        });
      }),
    );

  }

  async findAll() {
    return this.reservationRespository.find({})
  }

  async findOne(_id: string) {
    return this.reservationRespository.findOne({_id})
    
  }

  async findByUserId(id:string) {
    return this.reservationRespository.find({ userId:id })
  }

  async update( _id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRespository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto}
      )
  }

  async remove(_id: string) {
    return this.reservationRespository.findOneAndDelete({_id})
  }
}
