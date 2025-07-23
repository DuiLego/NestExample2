import { IsString, MinLength } from 'class-validator';

export class UpdateBrandDTO {

    @IsString()
    @MinLength(1)
    name: string;
}
