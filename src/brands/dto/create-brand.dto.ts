import { IsString, MinLength } from 'class-validator';

export class CreateBrandDTO {

    @IsString()
    @MinLength(1)
    name: string;
}
