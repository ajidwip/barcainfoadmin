import { Component } from '@angular/core';
import { ActionSheetController, AlertController, NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import moment from 'moment';
import { UUID } from 'angular2-uuid';
import { HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myFormNews: FormGroup;
  myFormGallery: FormGroup;
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

  public GalleryAll = [];
  public TotalGalleryAll: any;
  public GalleryAllActive = [];
  public TotalGalleryAllActive: any;
  public GalleryAllNotActive = [];
  public TotalGalleryAllNotActive: any;
  public GalleryMonth = [];
  public TotalGalleryMonth: any;
  public GalleryDay = [];
  public TotalGalleryDay: any;
  public photos = [];

  public nextno: any;
  public uuid = '';

  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public actionSheetCtrl: ActionSheetController) {
    this.myFormNews = fb.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      imageurl: ['', Validators.compose([Validators.required])],
    })
    this.myFormGallery = fb.group({
      title: ['', Validators.compose([Validators.required])],
      imageurl: ['', Validators.compose([Validators.required])],
      url: [''],
    })
    this.doGetNewsAll();
    this.doGetNewsAllActive();
    this.doGetNewsAllNotActive();
    this.doGetNewsAll();
    this.doGetNewsMonth();
    this.doGetNewsDay();
    this.doGetGalleryAll();
    this.doGetGalleryAllActive();
    this.doGetGalleryAllNotActive();
    this.doGetGalleryAll();
    this.doGetGalleryMonth();
    this.doGetGalleryDay();
    this.doRefreshPhotos();
  }
  doNews() {
    document.getElementById('news').style.display = 'block';
    document.getElementById('photos').style.display = 'none';
    /*document.getElementById('videos').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doPhotos() {
    let uuid = UUID.UUID();
    this.uuid = uuid;
    console.log(this.uuid)
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'block';
    /*document.getElementById('videos').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doRefresh() {
    this.doGetNewsAll();
    this.doGetNewsAllActive();
    this.doGetNewsAllNotActive();
    this.doGetNewsAll();
    this.doGetNewsMonth();
    this.doGetNewsDay();
    this.doGetGalleryAll();
    this.doGetGalleryAllActive();
    this.doGetGalleryAllNotActive();
    this.doGetGalleryAll();
    this.doGetGalleryMonth();
    this.doGetGalleryDay();
  }
  /******************************************NEWS*************************************************/

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
  doAddNews() {
    document.getElementById("myNews").style.display = "block";
  }
  doCloseAddNews() {
    document.getElementById("myNews").style.display = "none";
  }
  getNextNoNews() {
    return this.api.get('nextno/z_content_news/id')
  }
  doSaveNews() {
    this.getNextNoNews().subscribe(val => {
      this.nextno = val['nextno'];
      console.log(this.nextno)
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD');
      let time = moment().format('h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_news",
        {
          "id": this.nextno,
          "title": this.myFormNews.value.title,
          "description": this.myFormNews.value.description,
          "image_url": this.myFormNews.value.imageurl,
          "date": date,
          "time": time,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormNews.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddNews();
          this.doRefresh();
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
                this.doRefresh();
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
                this.doRefresh();
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
                this.doRefresh();
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
                this.doRefresh();
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
  /*************************************************************************************************/

  /******************************************PHOTOS*************************************************/

  doGetGalleryAll() {
    this.api.get('table/z_content_photos', { params: { limit: 1000 } })
      .subscribe(val => {
        this.GalleryAll = val['data'];
        this.TotalGalleryAll = val['count']
      });
  }
  doGetGalleryAllActive() {
    this.api.get('table/z_content_photos', { params: { limit: 1000, filter: "status='OPEN'" } })
      .subscribe(val => {
        this.GalleryAllActive = val['data'];
        this.TotalGalleryAllActive = val['count']
      });
  }
  doGetGalleryAllNotActive() {
    this.api.get('table/z_content_photos', { params: { limit: 1000, filter: "status!='OPEN'" } })
      .subscribe(val => {
        this.GalleryAllNotActive = val['data'];
        this.TotalGalleryAllNotActive = val['count']
      });
  }
  doGetGalleryMonth() {
    let month = moment().format('MM');
    this.api.get('table/z_content_photos', { params: { limit: 1000, filter: "month(date)=" + month } })
      .subscribe(val => {
        this.GalleryMonth = val['data'];
        this.TotalGalleryMonth = val['count']
      });
  }
  doGetGalleryDay() {
    let day = moment().format('YYYY-MM-DD');
    this.api.get('table/z_content_photos', { params: { limit: 1000, filter: "date=" + "'" + day + "'" } })
      .subscribe(val => {
        this.GalleryDay = val['data'];
        this.TotalGalleryDay = val['count']
      });
  }
  doAddGallery() {
    document.getElementById("myGallery").style.display = "block";
  }
  doCloseAddGallery() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Close',
      message: 'Do you want to close this gallery?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          handler: () => {
            document.getElementById("myGallery").style.display = "none";
          }
        }
      ]
    });
    alert.present();
  }
  getNextNoGallery() {
    return this.api.get('nextno/z_content_photos/id')
  }
  getNextNoImageLink() {
    return this.api.get('nextno/z_image_link/id')
  }
  doRefreshPhotos() {
    this.api.get('table/z_image_link', { params: { limit: 1000, filter: "uuid_parent=" + "'" + this.uuid + "'" } })
      .subscribe(val => {
        this.photos = val['data'];
      });
  }
  doSaveGallery() {
    this.getNextNoGallery().subscribe(val => {
      this.nextno = val['nextno'];
      let date = moment().format('YYYY-MM-DD');
      let time = moment().format('h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_photos",
        {
          "id": this.nextno,
          "title": this.myFormGallery.value.title,
          "image_url_thumb": this.myFormGallery.value.imageurl,
          "date": date,
          "time": time,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormGallery.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddGallery();
          this.doRefresh();
        })
    });
  }
  doAddphotos() {
    this.getNextNoImageLink().subscribe(val => {
      this.nextno = val['nextno'];
      let date = moment().format('YYYY-MM-DD');
      let time = moment().format('h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_image_link",
        {
          "id": this.nextno,
          "uuid_parent": this.uuid,
          "title": this.myFormGallery.value.title,
          "image_url": this.myFormGallery.value.url,
          "date": date,
          "time": time
        },
        { headers })
        .subscribe(val => {
          this.doRefreshPhotos();
          this.myFormGallery.get('url').setValue('');
        })
    });
  }
  doUpdateStatusGalleryNotActive(galleryall) {
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

            this.api.put("table/z_content_photos",
              {
                "id": galleryall.id,
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
                this.doRefresh();
              });
          }
        },
        {
          text: 'UPDATE CLSD',
          icon: 'md-hand',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_photos",
              {
                "id": galleryall.id,
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
                this.doRefresh();
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
  doUpdateStatusGalleryActive(galleryday) {
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

            this.api.put("table/z_content_photos",
              {
                "id": galleryday.id,
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
                this.doRefresh();
              });
          }
        },
        {
          text: 'UPDATE CLSD',
          icon: 'md-hand',
          handler: () => {
            const headers = new HttpHeaders()
              .set("Content-Type", "application/json");

            this.api.put("table/z_content_photos",
              {
                "id": galleryday.id,
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
                this.doRefresh();
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
  /*************************************************************************************************/
}
