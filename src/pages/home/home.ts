import { Component } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import moment from 'moment';
import { UUID } from 'angular2-uuid';
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public NewsAll = [];
  public TotalNewsAll: any;
  public NewsAllActive = [];
  public TotalNewsAllActive: any;
  public NewsAllNotActive = [];
  public TotalNewsAllNotActive: any;
  public NewsMonth = [];
  public TotalNewsMonth: any;
  public NewsDay = [];
  public TotalNewsDay: any;
  public title: any;
  public description: any;
  public imageurl: any;
  public nextno: any;
  public uuid = '';

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {

    this.doGetNewsAll();
    this.doGetNewsAllActive();
    this.doGetNewsAllNotActive();
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
    this.api.get('table/z_content_news', { params: { limit: 1000 } })
      .subscribe(val => {
        this.NewsAll = val['data'];
        this.TotalNewsAll = val['count']
      });
  }
  doGetNewsAllActive() {
    this.api.get('table/z_content_news', { params: { limit: 1000, filter: "status='OPEN'" } })
      .subscribe(val => {
        this.NewsAllActive = val['data'];
        this.TotalNewsAllActive = val['count']
      });
  }
  doGetNewsAllNotActive() {
    this.api.get('table/z_content_news', { params: { limit: 1000, filter: "status!='OPEN'" } })
      .subscribe(val => {
        this.NewsAllNotActive = val['data'];
        this.TotalNewsAllNotActive = val['count']
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
    this.doGetNewsAllActive();
    this.doGetNewsAllNotActive();
    this.doGetNewsAll();
    this.doGetNewsMonth();
    this.doGetNewsDay();
  }
  doAddNews() {
    document.getElementById("myModal").style.display = "block";
  }
  doCloseAddNews() {
    document.getElementById("myModal").style.display = "none";
  }
  getNextNoNews() {
    return this.api.get('nextno/z_content_news/id')
  }
  doSaveNews() {
    this.getNextNoNews().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD');
      let time = moment().format('h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_news",
        {
          "id": this.nextno,
          "title": this.title,
          "description": this.description,
          "image_url": this.imageurl,
          "date": date,
          "time": time,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.title = '';
          this.description = '';
          this.imageurl = '';
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddNews();
          this.doRefreshNews();
        })
    });
  }
  doUpdateStatusNewsNotActive(newall) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TOOLS',
      buttons: [
        {
          text: 'VIEW',
          icon: 'md-eye',
          handler: () => {
          }
        },
        {
          text: 'UPDATE OPEN',
          icon: 'md-open',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_news",
              {
                "id": newall.id,
                "status": 'OPEN'
              },
              { headers })
              .subscribe(val => {
                let alert = this.alertCtrl.create({
                  title: 'Sukses',
                  subTitle: 'Update Sukses',
                  buttons: ['OK']
                });
                alert.present();
                this.doRefreshNews();
              });
          }
        },
        {
          text: 'UPDATE CLSD',
          icon: 'md-hand',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_news",
              {
                "id": newall.id,
                "status": 'CLSD'
              },
              { headers })
              .subscribe(val => {
                let alert = this.alertCtrl.create({
                  title: 'Sukses',
                  subTitle: 'Update Sukses',
                  buttons: ['OK']
                });
                alert.present();
                this.doRefreshNews();
              });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'md-close',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }
  doUpdateStatusNewsActive(newday) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TOOLS',
      buttons: [
        {
          text: 'VIEW',
          icon: 'md-eye',
          handler: () => {
          }
        },
        {
          text: 'UPDATE OPEN',
          icon: 'md-open',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_news",
              {
                "id": newday.id,
                "status": 'OPEN'
              },
              { headers })
              .subscribe(val => {
                let alert = this.alertCtrl.create({
                  title: 'Sukses',
                  subTitle: 'Update Sukses',
                  buttons: ['OK']
                });
                alert.present();
                this.doRefreshNews();
              });
          }
        },
        {
          text: 'UPDATE CLSD',
          icon: 'md-hand',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_news",
              {
                "id": newday.id,
                "status": 'CLSD'
              },
              { headers })
              .subscribe(val => {
                let alert = this.alertCtrl.create({
                  title: 'Sukses',
                  subTitle: 'Update Sukses',
                  buttons: ['OK']
                });
                alert.present();
                this.doRefreshNews();
              });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'md-close',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }
}
