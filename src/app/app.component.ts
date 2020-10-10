import { Component } from '@angular/core';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    const config = {
      apiKey: "AIzaSyDXTUYDRCTghInVeEss6SeHXVevrj-P07A",
      authDomain: "thelibrarian-fd1b7.firebaseapp.com",
      databaseURL: "https://thelibrarian-fd1b7.firebaseio.com",
      projectId: "thelibrarian-fd1b7",
      storageBucket: "thelibrarian-fd1b7.appspot.com",
      messagingSenderId: "409710666446",
      appId: "1:409710666446:web:4e5e5efa34385bf128e69f",
      measurementId: "G-T9QTNXR3NF"
    }

    // Initialize Firebase
    firebase.initializeApp(config);
    // firebase.analytics();
  }
}
