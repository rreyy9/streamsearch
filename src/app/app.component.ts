import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StreamData, oauth, Stream, todo, Pages, NextData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'twitch_search';

  streams: Stream[]
  nextdatas: NextData[]
  todos: todo[];

  token: oauth;
  searchValue: string;
  pager: string;
  bearerToken: String;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onToken(){
    const tokenparams = new HttpParams()
      .set('client_id', '4scexyqd6nhgn4ewulcsegxdt2xgtt')
      .set('client_secret', 'z1tk94dzm4z52r3ji29fjm5vnd5m9v')
      .set('grant_type', 'client_credentials');

      this.httpClient.post<oauth>('https://id.twitch.tv/oauth2/token', tokenparams).subscribe(result => {
        this.bearerToken = result.access_token;
        console.log(this.bearerToken);
      })
  }

  onWorldOfWarcraft() {
    this.pager = '';

    const streamOptions = {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.bearerToken, 'client-id': '4scexyqd6nhgn4ewulcsegxdt2xgtt' },
      params: { 'game_id': '18122', 'first': '100', 'after': this.pager }
    };

    this.httpClient.get<any>('https://api.twitch.tv/helix/streams', streamOptions).subscribe(result => 
    {
      this.streams = result.data
      console.log(this.streams);
      this.pager = result.pagination.cursor
      console.log(this.pager);
    })   
  }
  onLoadNextData(){
    const streamOptions = {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.bearerToken, 'client-id': '4scexyqd6nhgn4ewulcsegxdt2xgtt' },
      params: { 'game_id': '18122', 'first': '100', 'type': 'live', 'after': this.pager }
    };

    this.httpClient.get<any>('https://api.twitch.tv/helix/streams', streamOptions).subscribe(result => 
    {
      this.nextdatas = result.data
      console.log(this.streams.concat(this.nextdatas))
      this.streams = this.streams.concat(this.nextdatas)
      this.pager = result.pagination.cursor
    })
  }
}