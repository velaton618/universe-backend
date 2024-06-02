/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'dotenv';
import axios from 'axios';

config();
export class $Db {
  static token: string = process.env.TOKEN || '';

  static async getMovies(offset: number, limit: number) {
    const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie?page=${offset}&limit=${limit}&notNullFields=backdrop.url&rating.imdb=7-10&year=2023-2024&countries.name=!россия&sortField=votes.imdb&sortType=-1`,
      {
        headers: { accept: 'application/json', 'X-API-KEY': $Db.token }
      }
    );
    console.log(response);

    if (response.data) {
      return response.data.docs;
    } else {
      return [];
    }
  }

  static async search(offset: number, limit: number, query: string) {
    const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/search?page=${offset}&limit=${limit}&query=${query}`,
      {
        headers: { accept: 'application/json', 'X-API-KEY': $Db.token }
      }
    );

    if (response.data) {
      return response.data.docs;
    } else {
      return [];
    }
  }

  static async getMovie(id: number) {
    const response = await axios.get(`https://api.kinopoisk.dev/v1.4/movie/${id}`,
      {
        headers: { accept: 'application/json', 'X-API-KEY': $Db.token }
      }
    );

    if (response.data) {
      return response.data;
    } else {
      return null
    }
  }
}
