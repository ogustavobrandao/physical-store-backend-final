import { IsNotEmpty, IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class CreateStoreDTO{
    @IsNotEmpty({ message: 'O campo storeName é obrigatório.' })
    @IsString({ message: 'O campo storeName deve ser uma string.' })
    storeName: string;

    @IsNotEmpty({ message: 'O campo takeOutInStore é obrigatório.' })
    takeOutInStore: boolean;

    @IsNotEmpty({ message: 'O campo shippingTimeInDays é obrigatório.' })
    shippingTimeInDays: number; // considerar o tempo de preparo

    @IsNotEmpty({ message: 'O campo latitude é obrigatório.' })
    @IsString({ message: 'O campo latitude deve ser uma string.' })
    latitude: string;

    @IsNotEmpty({ message: 'O campo longitude é obrigatório.' })
    @IsString({ message: 'O campo longitude deve ser uma string.' })
    longitude: string;

    @IsNotEmpty({ message: 'O campo address é obrigatório.' })
    @IsString({ message: 'O campo address deve ser uma string.' })
    address1: string;

    @IsOptional()
    @IsString({ message: 'O campo address2 deve ser uma string.' })
    address2: string;

    @IsOptional()
    @IsString({ message: 'O campo address3 deve ser uma string.' })
    address3: string;

    @IsNotEmpty({ message: 'O campo city é obrigatório.' })
    @IsString({ message: 'O campo city deve ser uma string.' })
    city: string;

    @IsNotEmpty({ message: 'O campo district é obrigatório.' })
    @IsString({ message: 'O campo district deve ser uma string.' })
    district: string;

    @IsNotEmpty({ message: 'O campo state é obrigatório.' })
    @IsString({ message: 'O campo state deve ser uma string.' })
    state: string;

    @IsNotEmpty({ message: 'O campo type é obrigatório.' })
    @IsString({ message: 'O campo type deve ser uma string.' })
    type: string; // PDV | LOJA

    @IsNotEmpty({ message: 'O campo country é obrigatório.' })
    @IsString({ message: 'O campo country deve ser uma string.' })
    country: string;

    @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
    @Matches(/^\d{5}-?\d{3}$/, {
      message: 'O campo postalCode deve estar no formato válido (ex: 00000-000).',
    })
    postalCode: string;

    @IsOptional()
    @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
        message: 'O campo telephoneNumber deve conter um formato válido.',
    })
    telephoneNumber?: string;

    @IsOptional()
    @IsEmail({}, { message: 'O campo emailAddress deve conter um endereço de email válido.' })
    emailAddress?: string;
}



