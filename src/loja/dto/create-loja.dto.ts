import { IsNotEmpty, IsString, IsOptional, IsEmail, Length, Matches } from 'class-validator';

export class CreateLojaDTO{
    @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
    @IsString({ message: 'O campo nome deve ser uma string.' })
    nome: string;


    @IsNotEmpty({ message: 'O campo logradouro é obrigatório.' })
    @IsString({ message: 'O campo logradouro deve ser uma string.' })
    logradouro: string;

    @IsNotEmpty({ message: 'O campo número é obrigatório.' })
    @IsString({ message: 'O campo número deve ser uma string.' })
    numero: string

    @IsNotEmpty({ message: 'O campo CEP é obrigatório.' })
    @Matches(/^\d{5}-?\d{3}$/, {
      message: 'O campo CEP deve estar no formato válido (ex: 00000-000).',
    })
    cep: string;

    @IsOptional()
    @Matches(/^\(?\d{2}\)?[\s-]?[\d\s-]{8,9}$/, {
        message: 'O campo telefone deve conter um número válido.',
    })
    telefone?: string;

    @IsOptional()
    @IsEmail({}, { message: 'O campo email deve conter um endereço de email válido.' })
    email?: string;
}