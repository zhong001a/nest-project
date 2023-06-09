import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user:UserDto) {
    const _user = await this.reservationsService.create(createReservationDto," user._id");
    return _user
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user:UserDto) {
    console.log(user)
    return this.reservationsService.findAll();
  }



  @Get('/reser')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@CurrentUser() user:UserDto) {

    console.log(user._id)

    return this.reservationsService.findByUserId(user._id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
