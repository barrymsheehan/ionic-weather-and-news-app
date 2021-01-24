import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from "ionic-angular";

import { SettingsPage } from "../settings/settings";
import { WeatherProvider } from "../../providers/weather/weather";
import { NewsProvider } from "../../providers/news/news";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {

  title: string = 'Weather & News';

  city: string;
  country: string;
  unit: string;
  validCity: boolean = false;

  weatherMain: string;
  weatherDescription: string;
  temp: number;
  feelsLike: number;
  weatherIcon: string;

  disableNews: boolean = true;
  hideNewsArticles: boolean = true;
  newsArticles: string[];
  newsTotalResults: number;

  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wp: WeatherProvider,
              private np: NewsProvider,
              private storage: Storage,
              private toastCtrl: ToastController) {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter HomePage");

    this.resetPage();

    this.storage.get('settings')
      .then((data) => {
        if(data != null) {
          let settings = JSON.parse(data);
          this.city = settings.userCity;
          this.unit = settings.userUnit;
          this.getWeatherAndCountry();
        } else {
          this.disableNews = true;
        }
      })
      .catch((error) => {
        alert("Problem accessing local storage from HomePage");
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }

  resetPage() {
    this.country = null;
    this.unit = null;
    this.validCity = false;

    this.weatherMain = null;
    this.weatherDescription = null;
    this.temp = null;
    this.feelsLike = null;
    this.weatherIcon = null;

    this.disableNews = true;
    this.hideNewsArticles = true;
    this.newsArticles = null;
    this.newsTotalResults = null;
  }

  getWeatherAndCountry() {
    this.wp.getWeather(this.city, this.unit).subscribe((data) => {
        this.weatherMain = data.weather[0].main;
        this.weatherDescription = data.weather[0].description;
        this.temp = data.main.temp;
        this.feelsLike = data.main.feels_like;
        this.weatherIcon = data.weather[0].icon;
        this.country = data.sys.country;
        
        this.validCity = true;
        this.disableNews = false;
    }, error => {
      this.showErrorToast();
    });
  }

  getNews() {
    this.np.getNews(this.country).subscribe((data) => {
      this.newsTotalResults = data.totalResults;
      this.newsArticles = data.articles;
      this.showNews();
    })
  }

  showNews() {
    this.hideNewsArticles = false;
  }

  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  showErrorToast() {
    this.toastOptions = {
      message: 'No valid city found',
      position: 'top',
      showCloseButton: true
    }
    this.toastCtrl.create(this.toastOptions).present();
  }
}
