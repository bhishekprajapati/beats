import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeatCard } from '@components/beat-card/beat-card';
import { BeatCardCover } from '@components/beat-card/beat-card-cover/beat-card-cover';
import { BeatCardHeader } from '@components/beat-card/beat-card-header/beat-card-header';
import { BeatCardTitle } from '@components/beat-card/beat-card-title/beat-card-title';
import { playlistQueryOptions } from 'src/app/services/beats-service/schemas';

@Component({
  selector: 'app-page-beats',
  imports: [BeatCard, BeatCardCover, BeatCardHeader, BeatCardTitle],
  templateUrl: './beats.html',
})
export class Beats {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const keys = this.route.snapshot.queryParamMap.keys;
    const queryParams: Record<any, any> = {};

    keys.forEach((key) => {
      const value = this.route.snapshot.queryParamMap.get(key);
      queryParams[key] = value;
    });

    const result = playlistQueryOptions
      .default({
        playlist: 'onescroll',
        page: 1,
      })
      .safeParse(queryParams);

    {
      const queryParams = result.data ?? { playlist: 'onescroll', page: 1 };
      console.log(queryParams);
    }
  }
}
