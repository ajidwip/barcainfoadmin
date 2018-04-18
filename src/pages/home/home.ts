import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public NewsAll = [];
  public TotalNewsAll:any;
  public NewsMonth = [];
  public TotalNewsMonth:any;
  public NewsDay = [];
  public TotalNewsDay:any;

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider) {
      this.doGetNewsAll();
      this.doGetNewsMonth();
      this.doGetNewsDay();
  }
  doNews() {
    document.getElementById('news').style.display = 'block';
    /*document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doGetNewsAll() {
    this.api.get('table/z_content_news', { params: { limit: 1000} })
      .subscribe(val => {
        this.NewsAll = val['data'];
        this.TotalNewsAll = val['count']
      });
  }
  doGetNewsMonth() {
    let month = moment().format('MM');
    this.api.get('table/z_content_news', { params: { limit: 1000, filter: "month(date)=" + month } })
      .subscribe(val => {
        this.NewsMonth = val['data'];
        this.TotalNewsMonth = val['count']
      });
  }
  doGetNewsDay() {
    let day = moment().format('YYYY-MM-DD');
    this.api.get('table/z_content_news', { params: { limit: 1000, filter: "date=" + "'" + day + "'" } })
      .subscribe(val => {
        this.NewsDay = val['data'];
        this.TotalNewsDay = val['count']
      });
  }
  doRefreshNews() {
    this.doGetNewsAll();
    this.doGetNewsMonth();
    this.doGetNewsDay();
  }
  doAddNews(){
    document.getElementById("myModal").style.display = "block";
  }
  doCloseAddNews(){
    document.getElementById("myModal").style.display = "none";
  }
}
