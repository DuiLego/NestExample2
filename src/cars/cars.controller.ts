import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
    ) {
        console.log({ id })

        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(
        @Body() createCardDto: CreateCarDTO
    ) {
        return this.carsService.create( createCardDto );
    }

    @Patch(':id')
    updateCar( 
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string, 
        @Body() updateCardDto: UpdateCarDTO
    ) {
        return this.carsService.update( id, updateCardDto );
    }

    @Delete(':id')
    deleteCar(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
    ) {
        return this.carsService.delete( id );
    }
}
