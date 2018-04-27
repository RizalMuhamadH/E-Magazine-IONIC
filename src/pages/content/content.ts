import { News } from './../../app/models/news';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the ContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {

  item = {} as News;

  content: string;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    
  }

  ionViewDidLoad() {
    this.content = this.item.news_content;
  }

}
