import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import {
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { PokemonDto } from './dto/pokemon.dto';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of Pokémon' })
  @ApiResponse({
    status: 200,
    description: 'List of Pokémon',
    type: [PokemonDto],
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 20,
    description: 'Number of Pokémon to return',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 0,
    description: 'Pagination offset',
  })
  async findAll(
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    return this.pokemonService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get('search')
  @ApiOperation({ summary: 'Search Pokémon by name' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Name or part of name to search for',
  })
  @ApiResponse({
    status: 200,
    description: 'List of matching Pokémon',
    type: [PokemonDto],
  })
  async search(@Query('query') query: string) {
    return this.pokemonService.search(query);
  }

  @Get(':idOrName')
  @ApiOperation({ summary: 'Get a specific Pokémon by ID or name' })
  @ApiParam({ name: 'idOrName', description: 'The ID or name of the Pokémon' })
  @ApiResponse({
    status: 200,
    description: 'The requested Pokémon',
    type: PokemonDto,
  })
  async findOne(@Param('idOrName') idOrName: string) {
    return this.pokemonService.findOne(idOrName);
  }
}
