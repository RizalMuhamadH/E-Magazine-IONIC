import { Edition } from './../../app/models/edition';
import { NetworkProvider } from './../../providers/network/network';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedPage } from '../feed/feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  editionList: any;
  data: Array<Edition>;
  url = this.networkProvider.url;

  constructor(public navCtrl: NavController, private networkProvider: NetworkProvider) {

  }

  ionViewWillEnter(){
   this.getEdition();
  }

  getEdition(){
    this.networkProvider.getEdition().subscribe(data => {
      this.editionList = data;
      this.data = this.editionList.data;
      console.log(this.data);

    });
  }

  itemSelected(slide){
    this.navCtrl.push(FeedPage, {
      item: slide
    });
    
  }
}
