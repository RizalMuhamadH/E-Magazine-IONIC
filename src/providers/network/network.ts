// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import { Observable } from "rxjs/observable";


/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  url: string;

  constructor(public http: Http) {
    this.url = 'http://rni.ayomedianetwork.com/';
    console.log(this.url);
    
  }

  getEdition(){
    // var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept', 'application/json');
    // headers.append('content-type', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    
    return this.http.get(this.url +'api/news_controller/getEdition')
    .map(this.extractRespone)
    .do(this.logRespone);
  }

  getAllNews(id: string) {
    
    let post = new FormData();
    post.append('start',id);

    return this.http.post(this.url + 'api/news_controller/getAllNews', post)
      .map(this.extractRespone)
      .do(this.logRespone);
  }

  private extractRespone(res: Response){
    return res.json();
  }

  // private catchError(error: Response | any){
  //   console.error(error);

  //   return Observable.throw(error.json().error || "Server Error.");
    
  // }

  private logRespone(res: Response){
    console.log(res);
    
  }

}
