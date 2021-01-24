import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';

import { Storage } from "@ionic/storage";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  title: string = 'Settings';

  city: string;
  unit: string;

  toastOptions: ToastOptions;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private storage: Storage)
  {
    this.storage.get('settings')
      .then((data) => {
        if(data != null) {
          let settings = JSON.parse(data);
          this.city = settings.userCity;
          this.unit = settings.userUnit;
        } else {
          this.unit = 'metric';
        }
      })
      .catch((error) => {
        alert("Problem accessing local storage from SettingsPage");
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveSettings() {

    if (this.city == '' || this.city == null) {
      this.city = 'Galway';
    }

    let settings: object = {
      userCity: this.city,
      userUnit: this.unit
    }

    this.storage.set('settings', JSON.stringify(settings));
    console.log("Settings saved.");

    this.showSaveToast();
  }

  showSaveToast() {
    this.toastOptions = {
      message: 'Settings Saved',
      position: 'top',
      duration: 3000
    }
    this.toastCtrl.create(this.toastOptions).present();
  }

}
