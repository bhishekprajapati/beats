import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BeatsService {
  private readonly BASE_URL = 'https://api-server.illpeoplemusic.com/api/v2';
}
