import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Brand } from './entities/brand.entity';

import { CreateBrandDTO, UpdateBrandDTO } from './dto';

@Injectable()
export class BrandsService {

  private brands : Brand[]= [
    /* {
        id: uuid(), 
        name: 'Toyota', 
        createdAt: new Date().getTime()
    } */
  ];

  /* Listar */
  create(createBrandDto: CreateBrandDTO) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(), 
      name: name.toLocaleLowerCase(), 
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);
    
    return brand;
  }

  /* Detalles */
  findAll() {
    return this.brands;
  }

  /* Crear */
  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id );

    if ( !brand ) throw new NotFoundException(`Brand with id '${ id }' not found`);
    
    return brand;
  }

  /* Actualizar */
  update(id: string, updateBrandDto: UpdateBrandDTO) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map( brand => {
        if(brand.id === id){
            brandDB.updatedAt = new Date().getTime();

            brandDB = {
                ...brandDB, 
                ...updateBrandDto
            }

            return brandDB;
        }

        return brand;
    });
    
    return brandDB;    
  }

  /* Eliminar */
  remove(id: string) {
    this.brands = this.brands.filter( brand => brand.id !== id );
  }

  /* Ingresar datos */
    fillBrandsWithSeedData( brands: Brand[] ) {
        this.brands = brands;
    }
}
