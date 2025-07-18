import { Injectable, NotFoundException  } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {

    private cars : Car[]= [
        {
            id: uuid(), 
            brand: 'Toyota', 
            model: 'Corolla'
        }, 
        {
            id: uuid(), 
            brand: 'Honda', 
            model: 'Civic'
        }, 
        {
            id: uuid(), 
            brand: 'Nissan', 
            model: 'Frontier'
        }
    ];

    /* Listar */
    findAll() {
        return this.cars;
    }

    /* Detalles */
    findOneById( id: string ) {
        const car = this.cars.find( car => car.id === id );

        if ( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
        
        return car;
    }

    /* Crear */
    create( createCarDto: CreateCarDTO) {
        const car: Car = {
            id: uuid(), 
            brand: createCarDto.brand, 
            model: createCarDto.model
        };

        this.cars.push(car);

        return car;
    }

    /* Actualizar */
    update( id: string, updateCarDto: UpdateCarDTO) {
        let carDB = this.findOneById(id);

        this.cars = this.cars.map( car => {
            if(car.id === id){
                carDB = {
                    ...carDB, 
                    ...updateCarDto, 
                    id
                }

                return carDB;
            }

            return car;
        });
        
        return carDB;
    }

    /* Eliminar */
    delete( id: string) {
        this.findOneById(id);

        this.cars = this.cars.filter( car => car.id !== id );
    }
}

