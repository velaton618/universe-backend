import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { $Db } from 'src/utils/$db';

@Injectable()
export class MoviesService {
  async getMovies(offset: number, limit: number) {
    return await $Db.getMovies(offset, limit);
  }

  async search(offset: number, limit: number, query: string) {
    return await $Db.search(offset, limit, query);
  }

  async getMovie(id: number) {
    return await $Db.getMovie(id);
  }

  async getPlayer(id: number) {
    const response = await axios.get(`https://kinoclub.dev/api/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_KINOCLUB || ''}`,
      },
    });
    const data = response.data;

    if (data) {
      return data.data.url
        ? {
            type: 'movie',
            data: data.data.url,
          }
        : {
            type: 'series',
            data: data.data.seasons,
          };
    } else {
      return null;
    }
  }
}
