import { IsNotEmpty, IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class CreateStoreDTO{
    @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
    @IsString({ message: 'O campo nome deve ser uma string.' })
    storeName: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    takeOutInStore: boolean;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    shippingTimeInDays: number; // considerar o tempo de preparo

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    latitude: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    longitude: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    address1: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    address2: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    address3: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    city: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    district: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    state: string;

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    type: string; // PDV | LOJA

    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    country: string;

    @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
    @Matches(/^\d{5}-?\d{3}$/, {
      message: 'O campo CEP deve estar no formato válido (ex: 00000-000).',
    })
    postalCode: string;

    @IsOptional()
    @Matches(/^\(?\d{2}\)?[\s-]?[\d\s-]{8,9}$/, {
        message: 'O campo telefone deve conter um número válido.',
    })
    telephoneNumber?: string;

    @IsOptional()
    @IsEmail({}, { message: 'O campo email deve conter um endereço de email válido.' })
    emailAddress?: string;
}



