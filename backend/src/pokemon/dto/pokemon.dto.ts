import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class PokemonDto {
  @ApiProperty({ example: 1, description: 'The unique ID of the Pokémon' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'bulbasaur', description: 'The name of the Pokémon' })
  @IsString()
  name: string;

  @ApiProperty({ example: ['grass', 'poison'], description: 'Types of the Pokémon' })
  @IsArray()
  @IsString({ each: true })
  types: string[];

  @ApiProperty({
    example: {
      front_default: 'https://raw.githubusercontent.com/.../bulbasaur.png',
    },
    description: 'Sprite images of the Pokémon',
  })
  @IsObject()
  sprites: object;

  @ApiProperty({ example: 0.7, description: 'Height in meters' })
  @IsNumber()
  height: number;

  @ApiProperty({ example: 6.9, description: 'Weight in kilograms' })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: ['overgrow', 'chlorophyll'],
    description: 'List of abilities',
  })
  @IsArray()
  @IsString({ each: true })
  abilities: string[];

  @ApiProperty({ example: 'Seed Pokémon', description: 'Species or genus' })
  @IsString()
  species: string;

  @ApiProperty({ example: ['monster', 'plant'], description: 'Egg groups' })
  @IsArray()
  @IsString({ each: true })
  egg_groups: string[];

  @ApiProperty({ example: 20, description: 'Hatch counter' })
  @IsNumber()
  hatch_counter: number;
}
