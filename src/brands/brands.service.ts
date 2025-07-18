import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Brand } from './entities/brand.entity';

import { CreateBrandDTO, UpdateBrandDTO } from './dto';

@Injectable()
export class BrandsService {

  private brands : Brand[]= [
        {
            id: uuid(), 
            name: 'Toyota', 
            createdAt: new Date().getTime()
        }
  ];

  create(createBrandDto: CreateBrandDTO) {
    return 'This action adds a new brand';
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id );

    if ( !brand ) throw new NotFoundException(`Brand with id '${ id }' not found`);
    
    return brand;
  }

  update(id: number, updateBrandDto: UpdateBrandDTO) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
