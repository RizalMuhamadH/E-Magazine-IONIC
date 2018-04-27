import { News } from './../../app/models/news';
import { NetworkProvider } from './../../providers/network/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContentPage } from '../content/content';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * https://www.youtube.com/watch?v=NuA5rmNNRLc
 * https://www.youtube.com/watch?v=Wb0weT3vD6I
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  item: any;
  data: any;
  dataArray: Array<News>;

  url: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private networkProvider: NetworkProvider, 
    private toast: ToastController) {
    this.item = navParams.get('item');
    this.url = networkProvider.url;
  }

  ionViewDidLoad() {
    this.getAllNews();
  }

  getAllNews() {
    this.networkProvider.getAllNews(this.item.edition_id).subscribe(data => {
      this.data = data;
      
      if(this.data.status == 'failed'){
        this.toast.create({
          message: 'Article Empty',
          duration: 3000,
          position: 'bottom'
        }).present();
      } else {
        this.dataArray = this.data.data;
      }
    });
  }

  itemSelected(item){
    this.navCtrl.push(ContentPage, {
      item: item
    });
  }

}
