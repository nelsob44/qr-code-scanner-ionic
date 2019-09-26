import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isOn: Boolean = false;
  scannedData: {};

  constructor(public navCtrl: NavController, private qrScanner: QRScanner, private iab: InAppBrowser) { }

  startScanner() {

    this.qrScanner.show()
      .then((data: QRScannerStatus) => {
          this.isOn = true;
          alert('datashowing ' + data.showing);

          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            const browser = this.iab.create(text);

            browser.on('loadstop').subscribe(event => {
              
           });
            this.qrScanner.hide();
            scanSub.unsubscribe();
            this.isOn = false;
          });
      }, err => {
        this.isOn = false;
      });
  }

  closeScanner() {
    this.isOn = false;
    this.qrScanner.hide();
  }
}