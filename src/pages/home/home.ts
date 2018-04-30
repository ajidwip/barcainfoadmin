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
  myFormVideos: FormGroup;
  myFormSchedule: FormGroup;
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
  public id: any;

  public VideosAll = [];
  public TotalVideosAll: any;
  public VideosAllActive = [];
  public TotalVideosAllActive: any;
  public VideosAllNotActive = [];
  public TotalVideosAllNotActive: any;
  public VideosMonth = [];
  public TotalVideosMonth: any;
  public VideosDay = [];
  public TotalVideosDay: any;

  public ScheduleAll = [];
  public TotalScheduleAll: any;
  public ScheduleAllActive = [];
  public TotalScheduleAllActive: any;
  public ScheduleAllNotActive = [];
  public TotalScheduleAllNotActive: any;
  public ScheduleMonth = [];
  public TotalScheduleMonth: any;
  public ScheduleDay = [];
  public TotalScheduleDay: any;

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
      sumber: ['', Validators.compose([Validators.required])],
    })
    this.myFormGallery = fb.group({
      title: ['', Validators.compose([Validators.required])],
      imageurl: ['', Validators.compose([Validators.required])],
      url: [''],
    })
    this.myFormVideos = fb.group({
      title: ['', Validators.compose([Validators.required])],
      imageurlthumb: ['', Validators.compose([Validators.required])],
      videourl: ['', Validators.compose([Validators.required])]
    })
    this.myFormSchedule = fb.group({
      league: ['', Validators.compose([Validators.required])],
      round: ['', Validators.compose([Validators.required])],
      clubhome: ['', Validators.compose([Validators.required])],
      clubhomeicon: ['', Validators.compose([Validators.required])],
      clubaway: ['', Validators.compose([Validators.required])],
      clubawayicon: ['', Validators.compose([Validators.required])],
      place: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      time: ['', Validators.compose([Validators.required])]
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

    this.doGetVideosAll();
    this.doGetVideosAllActive();
    this.doGetVideosAllNotActive();
    this.doGetVideosAll();
    this.doGetVideosMonth();
    this.doGetVideosDay();

    this.doGetScheduleAll();
    this.doGetScheduleAllActive();
    this.doGetScheduleAllNotActive();
    this.doGetScheduleAll();
    this.doGetScheduleMonth();
    this.doGetScheduleDay();
  }
  doNews() {
    document.getElementById('news').style.display = 'block';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    /*document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doPhotos() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'block';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    /*document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doVideos() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'block';
    document.getElementById('calendar').style.display = 'none';
    /*document.getElementById('players').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('nobar').style.display = 'none';
    document.getElementById('highlight').style.display = 'none';
    document.getElementById('youtube').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';*/
  }
  doCalendar() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'block';
    /*document.getElementById('players').style.display = 'none';
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
    this.doGetVideosAll();
    this.doGetVideosAllActive();
    this.doGetVideosAllNotActive();
    this.doGetVideosAll();
    this.doGetVideosMonth();
    this.doGetVideosDay();
    this.doGetScheduleAll();
    this.doGetScheduleAllActive();
    this.doGetScheduleAllNotActive();
    this.doGetScheduleAll();
    this.doGetScheduleMonth();
    this.doGetScheduleDay();
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
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_news",
        {
          "id": this.nextno,
          "title": this.myFormNews.value.title,
          "description": this.myFormNews.value.description,
          "sumber": this.myFormNews.value.sumber,
          "image_url": this.myFormNews.value.imageurl,
          "date": date,
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
          this.nextno = '';
          this.uuid = '';
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
    let uuid = UUID.UUID();
    this.uuid = uuid;
    this.getNextNoGallery().subscribe(val => {
      this.nextno = val['nextno'];
      this.id = this.nextno;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_photos",
        {
          "id": this.id,
          "title": this.myFormGallery.value.title,
          "image_url_thumb": this.myFormGallery.value.imageurl,
          "date": date,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          document.getElementById("myGallery").style.display = "block";
        })
    });
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
            const headers = new HttpHeaders()
            .set("Content-Type", "application/json");
            this.api.delete('table/z_content_photos', { params: { limit: 1000, filter: "id=" + "'" + this.id + "'"  } })
              .subscribe(val => {
                document.getElementById("myGallery").style.display = "none";
                this.nextno = '';
                this.id = '';
                this.uuid = '';
                this.photos = [];
              });
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
    let date = moment().format('YYYY-MM-DD h:mm:ss');
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    this.api.put("table/z_content_photos",
      {
        "id": this.id,
        "title": this.myFormGallery.value.title,
        "image_url_thumb": this.myFormGallery.value.imageurl,
        "date": date,
        "status": 'VERIFIKASI'
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
        document.getElementById("myGallery").style.display = "none";
        this.doRefresh();
        this.nextno = '';
        this.id = '';
        this.uuid = '';
        this.photos = [];
      })
  }
  doAddphotos() {
    this.getNextNoImageLink().subscribe(val => {
      this.nextno = val['nextno'];
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_image_link",
        {
          "id": this.nextno,
          "uuid_parent": this.uuid,
          "title": this.myFormGallery.value.title,
          "image_url": this.myFormGallery.value.url,
          "date": date
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
          text: 'UPDATE GALLERY',
          icon: 'md-image',
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
  /*******************************************VIDEOS************************************************/
  doGetVideosAll() {
    this.api.get('table/z_content_videos', { params: { limit: 1000 } })
      .subscribe(val => {
        this.VideosAll = val['data'];
        this.TotalVideosAll = val['count']
      });
  }
  doGetVideosAllActive() {
    this.api.get('table/z_content_videos', { params: { limit: 1000, filter: "status='OPEN'" } })
      .subscribe(val => {
        this.VideosAllActive = val['data'];
        this.TotalVideosAllActive = val['count']
      });
  }
  doGetVideosAllNotActive() {
    this.api.get('table/z_content_videos', { params: { limit: 1000, filter: "status!='OPEN'" } })
      .subscribe(val => {
        this.VideosAllNotActive = val['data'];
        this.TotalVideosAllNotActive = val['count']
      });
  }
  doGetVideosMonth() {
    let month = moment().format('MM');
    this.api.get('table/z_content_videos', { params: { limit: 1000, filter: "month(date)=" + month } })
      .subscribe(val => {
        this.VideosMonth = val['data'];
        this.TotalVideosMonth = val['count']
      });
  }
  doGetVideosDay() {
    let day = moment().format('YYYY-MM-DD');
    this.api.get('table/z_content_videos', { params: { limit: 1000, filter: "date=" + "'" + day + "'" } })
      .subscribe(val => {
        this.VideosDay = val['data'];
        this.TotalVideosDay = val['count']
      });
  }
  doAddVideos() {
    this.myFormVideos.get('videourl').setValue('https://www.youtube.com/embed/')
    document.getElementById("myVideos").style.display = "block";
  }
  doCloseAddVideos() {
    document.getElementById("myVideos").style.display = "none";
  }
  getNextNoVideos() {
    return this.api.get('nextno/z_content_videos/id')
  }
  doSaveVideos() {
    this.getNextNoVideos().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_content_videos",
        {
          "id": this.nextno,
          "title": this.myFormVideos.value.title,
          "image_url_thumb" : this.myFormVideos.value.imageurlthumb,
          "video_url": this.myFormVideos.value.videourl,
          "date": date,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormVideos.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddVideos();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }
  doUpdateStatusVideosNotActive(videoall) {
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

            this.api.put("table/z_content_videos",
              {
                "id": videoall.id,
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

            this.api.put("table/z_content_videos",
              {
                "id": videoall.id,
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
  doUpdateStatusVideosActive(videoday) {
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

            this.api.put("table/z_content_videos",
              {
                "id": videoday.id,
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

            this.api.put("table/z_content_videos",
              {
                "id": videoday.id,
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
   /*******************************************SCHEDULE************************************************/
   doGetScheduleAll() {
    this.api.get('table/z_schedule', { params: { limit: 1000 } })
      .subscribe(val => {
        this.ScheduleAll = val['data'];
        this.TotalScheduleAll = val['count']
      });
  }
  doGetScheduleAllActive() {
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "status='OPEN'" } })
      .subscribe(val => {
        this.ScheduleAllActive = val['data'];
        this.TotalScheduleAllActive = val['count']
      });
  }
  doGetScheduleAllNotActive() {
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "status!='OPEN'" } })
      .subscribe(val => {
        this.ScheduleAllNotActive = val['data'];
        this.TotalScheduleAllNotActive = val['count']
      });
  }
  doGetScheduleMonth() {
    let month = moment().format('MM');
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "month(date)=" + month } })
      .subscribe(val => {
        this.ScheduleMonth = val['data'];
        this.TotalScheduleMonth = val['count']
      });
  }
  doGetScheduleDay() {
    let day = moment().format('YYYY-MM-DD');
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "date=" + "'" + day + "'" } })
      .subscribe(val => {
        this.ScheduleDay = val['data'];
        this.TotalScheduleDay = val['count']
      });
  }
  doAddSchedule() {
    document.getElementById("mySchedule").style.display = "block";
  }
  doCloseAddSchedule() {
    document.getElementById("mySchedule").style.display = "none";
  }
  getNextNoSchedule() {
    return this.api.get('nextno/z_schedule/id')
  }
  doSaveSchedule() {
    this.getNextNoSchedule().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let year = moment().format('YYYY');
      let month = moment().format('MMMM');
      let day = moment().format('DD');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_schedule",
        {
          "id": this.nextno,
          "league": this.myFormSchedule.value.league,
          "round": this.myFormSchedule.value.round,
          "club_home": this.myFormSchedule.value.clubhome,
          "club_home_icon_url": this.myFormSchedule.value.clubhomeicon,
          "club_away": this.myFormSchedule.value.clubaway,
          "club_away_icon_url": this.myFormSchedule.value.clubawayicon,
          "place": this.myFormSchedule.value.place,
          "year": year,
          "month": month,
          "day": day,
          "date": this.myFormSchedule.value.date,
          "time": this.myFormSchedule.value.time,
          "status": 'VERIFIKASI',
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormSchedule.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddSchedule();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }
  doUpdateStatusScheduleNotActive(scheduleall) {
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

            this.api.put("table/z_schedule",
              {
                "id": scheduleall.id,
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

            this.api.put("table/z_schedule",
              {
                "id": scheduleall.id,
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
  doUpdateStatusScheduleActive(scheduleday) {
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

            this.api.put("table/z_schedule",
              {
                "id": scheduleday.id,
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

            this.api.put("table/z_schedule",
              {
                "id": scheduleday.id,
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
