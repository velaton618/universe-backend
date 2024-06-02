import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly $service: MoviesService) {}

  @Get()
  async getMovies(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return await this.$service.getMovies(offset, limit);
  }

  @Get('/search')
  async search(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('query') query: string,
  ) {
    return await this.$service.search(offset, limit, query);
  }

  @Get('player/:id')
  async getPlayer(@Param('id') id: number) {
    return await this.$service.getPlayer(id);
  }

  @Get(':id')
  async getMovie(@Param('id') id: number) {
    return await this.$service.getMovie(id);
  }
}
