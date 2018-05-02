import { HomePage } from './../home/home';
import { News } from './../../app/models/news';
import { NetworkProvider } from './../../providers/network/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, MenuController} from 'ionic-angular';
// import { ContentPage } from '../content/content';
import { ReadPage } from '../read/read';

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

  // public unregisterBackButtonAction: any;

  url: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private networkProvider: NetworkProvider, 
    private toast: ToastController, 
    public platform: Platform, 
    menu: MenuController) {

    // this.platform.ready().then(() => {
    //   this.platform.registerBackButtonAction(() => {
    //     let nav = app.getActiveNav();
    //     if(nav.canGoBack()){
    //       nav.pop();
    //     }
        
    //   });
    // });

      // let back = platform.registerBackButtonAction(() => {
      //   this.navCtrl.pop();
      //   back();
      // },100);
      menu.enable(true);
      this.item = navParams.get('item');
      this.url = networkProvider.url;
  }

  ionViewDidLoad() {
    // this.initializeBackButtonCustomHandler();
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
    this.navCtrl.push(ReadPage, {
      item: item
    });
  }

  gotoBack(){
    this.navCtrl.setRoot(HomePage);
  }

  // initializeBackButtonCustomHandler(): void {
  //   this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
  //     console.log('Prevent Back Button Page Change');
  //   }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  // }  

  // ionViewWillLeave() {
  //   // Unregister the custom back button action for this page
  //   this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  // }

}
