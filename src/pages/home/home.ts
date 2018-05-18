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
  myFormScheduleUpdate: FormGroup;
  myFormClub: FormGroup;
  myFormFansPage: FormGroup;
  myFormPlayers: FormGroup;
  myFormStreaming: FormGroup;
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

  public Clubs = [];
  public TotalClubs: any;

  public FansPage = [];
  public TotalFansPage: any;

  public Players = [];
  public TotalPlayers: any;

  public Streaming = [];
  public TotalStreaming: any;

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
      date: ['', Validators.compose([Validators.required])]
    })
    this.myFormScheduleUpdate = fb.group({
      league: ['', Validators.compose([Validators.required])],
      round: ['', Validators.compose([Validators.required])],
      clubhome: ['', Validators.compose([Validators.required])],
      clubhomeicon: ['', Validators.compose([Validators.required])],
      clubaway: ['', Validators.compose([Validators.required])],
      clubawayicon: ['', Validators.compose([Validators.required])],
      place: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      linkstreaming: ['', Validators.compose([Validators.required])]
    })
    this.myFormClub = fb.group({
      nation: ['', Validators.compose([Validators.required])],
      clubname: ['', Validators.compose([Validators.required])],
      alias: ['', Validators.compose([Validators.required])],
      stadion: ['', Validators.compose([Validators.required])],
      iconurl: ['', Validators.compose([Validators.required])]
    })
    this.myFormFansPage = fb.group({
      fanspage: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      alias: ['', Validators.compose([Validators.required])],
      iconurl: ['', Validators.compose([Validators.required])],
      pageurl: ['', Validators.compose([Validators.required])]
    })
    this.myFormPlayers = fb.group({
      name: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      positiongroup: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])],
      imgurl: ['', Validators.compose([Validators.required])],
      season: ['', Validators.compose([Validators.required])]
    })
    this.myFormStreaming = fb.group({
      title: ['', Validators.compose([Validators.required])],
      thumbnail: [''],
      source: ['', Validators.compose([Validators.required])]
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

    this.doGetClub();

    this.doGetFansPage();

    this.doGetPlayers();

    this.doGetStreaming();
  }
  doNews() {
    document.getElementById('news').style.display = 'block';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doPhotos() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'block';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doVideos() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'block';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doCalendar() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'block';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doClub() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'block';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doFansPage() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'block';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'none';
  }
  doPlayers() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'block';
    document.getElementById('streaming').style.display = 'none';
  }
  doStreaming() {
    document.getElementById('news').style.display = 'none';
    document.getElementById('photos').style.display = 'none';
    document.getElementById('videos').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('club').style.display = 'none';
    document.getElementById('fanspage').style.display = 'none';
    document.getElementById('players').style.display = 'none';
    document.getElementById('streaming').style.display = 'block';
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
    this.doGetClub();
    this.doGetFansPage();
    this.doGetPlayers();
    this.doGetStreaming();
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
            this.api.delete('table/z_content_photos', { params: { limit: 1000, filter: "id=" + "'" + this.id + "'" } })
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
          "image_url_thumb": this.myFormVideos.value.imageurlthumb,
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
    this.api.get('table/z_schedule', { params: { limit: 1000, sort: "date" + " ASC " } })
      .subscribe(val => {
        this.ScheduleAll = val['data'];
        this.TotalScheduleAll = val['count']
      });
  }
  doGetScheduleAllActive() {
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "status='OPEN'", sort: "date" + " ASC " } })
      .subscribe(val => {
        this.ScheduleAllActive = val['data'];
        this.TotalScheduleAllActive = val['count']
      });
  }
  doGetScheduleAllNotActive() {
    this.api.get('table/z_schedule', { params: { limit: 1000, filter: "status!='OPEN'", sort: "date" + " ASC " } })
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
  onSelectClubHome(club) {
    this.myFormSchedule.get('clubhomeicon').setValue(club.icon_url)
    this.myFormSchedule.get('place').setValue(club.stadion)
  }
  onSelectClubAway(club) {
    this.myFormSchedule.get('clubawayicon').setValue(club.icon_url)
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
          "date": this.myFormSchedule.value.date,
          "status": 'VERIFIKASI',
          "info_live": 'LIVE STREAMING',
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
  doUpdateStatusScheduleActive(scheduleall) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'TOOLS',
      buttons: [
        {
          text: 'UPDATE',
          icon: 'md-eye',
          handler: () => {
            this.id = scheduleall.id
            this.myFormScheduleUpdate.get('league').setValue(scheduleall.league)
            this.myFormScheduleUpdate.get('round').setValue(scheduleall.round)
            this.myFormScheduleUpdate.get('clubhome').setValue(scheduleall.club_home)
            this.myFormScheduleUpdate.get('clubhomeicon').setValue(scheduleall.club_home_icon_url)
            this.myFormScheduleUpdate.get('clubaway').setValue(scheduleall.club_away)
            this.myFormScheduleUpdate.get('clubawayicon').setValue(scheduleall.club_away_icon_url)
            this.myFormScheduleUpdate.get('place').setValue(scheduleall.place)
            this.myFormScheduleUpdate.get('date').setValue(scheduleall.date)
            this.myFormScheduleUpdate.get('linkstreaming').setValue(scheduleall.link_streaming)
            this.doUpdateSchedule();
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
  doUpdateSchedule() {
    document.getElementById("myScheduleUpdate").style.display = "block";
  }
  doCloseUpdateSchedule() {
    document.getElementById("myScheduleUpdate").style.display = "none";
  }
  onSelectClubHomeUpdate(club) {
    this.myFormScheduleUpdate.get('clubhomeicon').setValue(club.icon_url)
    this.myFormScheduleUpdate.get('place').setValue(club.stadion)
  }
  onSelectClubAwayUpdate(club) {
    this.myFormScheduleUpdate.get('clubawayicon').setValue(club.icon_url)
  }
  doSaveUpdateSchedule() {
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
      this.api.put("table/z_schedule",
        {
          "id": this.id,
          "league": this.myFormScheduleUpdate.value.league,
          "round": this.myFormScheduleUpdate.value.round,
          "club_home": this.myFormScheduleUpdate.value.clubhome,
          "club_home_icon_url": this.myFormScheduleUpdate.value.clubhomeicon,
          "club_away": this.myFormScheduleUpdate.value.clubaway,
          "club_away_icon_url": this.myFormScheduleUpdate.value.clubawayicon,
          "place": this.myFormScheduleUpdate.value.place,
          "date": this.myFormScheduleUpdate.value.date,
          "link_streaming": this.myFormScheduleUpdate.value.linkstreaming,
          "info_live": 'LIVE STREAMING',
        },
        { headers })
        .subscribe(val => {
          this.myFormScheduleUpdate.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Update Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseUpdateSchedule();
          this.doRefresh();
          this.id = '';
        })
  }
  /*************************************************************************************************/
  /**********************************************CLUB***********************************************/

  doGetClub() {
    this.api.get('table/z_club', { params: { limit: 100 } })
      .subscribe(val => {
        this.Clubs = val['data'];
        this.TotalClubs = val['count']
      });
  }
  doAddClub() {
    document.getElementById("myClub").style.display = "block";
    this.myFormClub.get('iconurl').setValue('http://101.255.60.202/webapi5/img/')
  }
  doCloseAddClub() {
    document.getElementById("myClub").style.display = "none";
    this.myFormClub.reset();
  }
  changename() {
    this.myFormClub.get('iconurl').setValue('http://101.255.60.202/webapi5/img/' + this.myFormClub.value.clubname)
  }
  getNextNoClub() {
    return this.api.get('nextno/z_club/id')
  }
  doSaveClub() {
    this.getNextNoClub().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_club",
        {
          "id": this.nextno,
          "name": this.myFormClub.value.clubname,
          "alias": this.myFormClub.value.alias,
          "nation": this.myFormClub.value.nation,
          "stadion": this.myFormClub.value.stadion,
          "icon_url": this.myFormClub.value.iconurl,
          "date": date,
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormClub.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          // this.doCloseAddClub();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }

  /*************************************************************************************************/
  /*******************************************FANS PAGE*********************************************/

  doGetFansPage() {
    this.api.get('table/z_fanspage', { params: { limit: 100 } })
      .subscribe(val => {
        this.FansPage = val['data'];
        this.TotalFansPage = val['count']
      });
  }
  doAddFansPage() {
    document.getElementById("myFansPage").style.display = "block";
  }
  doCloseAddFansPage() {
    document.getElementById("myFansPage").style.display = "none";
    this.myFormFansPage.reset();
  }
  getNextNoFansPage() {
    return this.api.get('nextno/z_fanspage/id')
  }
  doSaveFansPage() {
    this.getNextNoFansPage().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_fanspage",
        {
          "id": this.nextno,
          "fanspage": this.myFormFansPage.value.fanspage,
          "name": this.myFormFansPage.value.name,
          "alias": this.myFormFansPage.value.alias,
          "icon_url": this.myFormFansPage.value.iconurl,
          "page_url": this.myFormFansPage.value.pageurl,
          "date": date,
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormFansPage.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddFansPage();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }
  /*************************************************************************************************/
  /********************************************PLAYERS**********************************************/

  doGetPlayers() {
    this.api.get('table/z_players', { params: { limit: 100 } })
      .subscribe(val => {
        this.Players = val['data'];
        this.TotalPlayers = val['count']
      });
  }
  doAddPlayers() {
    document.getElementById("myPlayers").style.display = "block";
    this.myFormPlayers.get('season').setValue('2017-2018')
  }
  doCloseAddPlayers() {
    document.getElementById("myPlayers").style.display = "none";
    this.myFormPlayers.reset();
  }
  getNextNoPlayers() {
    return this.api.get('nextno/z_players/id')
  }
  doSavePlayers() {
    this.getNextNoPlayers().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_players",
        {
          "id": this.nextno,
          "name": this.myFormPlayers.value.name,
          "position": this.myFormPlayers.value.position,
          "position_group": this.myFormPlayers.value.positiongroup,
          "number": this.myFormPlayers.value.number,
          "img_url": this.myFormPlayers.value.imgurl,
          "season": this.myFormPlayers.value.season,
          "status": 'OPEN',
          "date": date,
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormPlayers.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddPlayers();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }
  /*************************************************************************************************/
  /******************************************STREAMING********************************************/

  doGetStreaming() {
    this.api.get('table/z_streaming', { params: { limit: 1000 } })
      .subscribe(val => {
        this.Streaming = val['data'];
        this.TotalStreaming = val['count']
      });
  }
  doAddStreaming() {
    document.getElementById("myStreaming").style.display = "block";
    this.myFormStreaming.get('source').setValue('https://www.youtube.com/embed/')
  }
  doCloseAddStreaming() {
    document.getElementById("myStreaming").style.display = "none";
    this.myFormStreaming.reset();
  }
  getNextNoStreaming() {
    return this.api.get('nextno/z_streaming/id')
  }
  doSaveStreaming() {
    this.getNextNoStreaming().subscribe(val => {
      this.nextno = val['nextno'];
      let uuid = UUID.UUID();
      this.uuid = uuid;
      let date = moment().format('YYYY-MM-DD h:mm:ss');
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json");

      this.api.post("table/z_streaming",
        {
          "id": this.nextno,
          "title": this.myFormStreaming.value.title,
          "thumbnail": this.myFormStreaming.value.thumbnail,
          "source": this.myFormStreaming.value.source,
          "status": 'VERIFIKASI',
          "date": date,
          "uuid": this.uuid
        },
        { headers })
        .subscribe(val => {
          this.myFormStreaming.reset();
          let alert = this.alertCtrl.create({
            title: 'Sukses',
            subTitle: 'Save Sukses',
            buttons: ['OK']
          });
          alert.present();
          this.doCloseAddStreaming();
          this.doRefresh();
          this.nextno = '';
          this.uuid = '';
        })
    });
  }
  doUpdateStreaming(stream) {
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

            this.api.put("table/z_streaming",
              {
                "id": stream.id,
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

            this.api.put("table/z_streaming",
              {
                "id": stream.id,
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
