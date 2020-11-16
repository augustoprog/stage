import { Component, ViewChild } from "@angular/core";
//import { Keyboard } from "@ionic-native/keyboard";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { StatusBar } from "@ionic-native/status-bar";
import {
  App,
  MenuController,
  NavController,
  Platform,
  ToastController,
  AlertController
} from "ionic-angular";
import { KeycloakService } from "../keycloak";
import { CadastrarPage } from "../pages/cadastrar/cadastrar";
import { ProfilePage } from "../pages/profile/profile";
import { TabsPage } from "../pages/tabs/tabs";
import { UsuarioContatoPage } from "../pages/usuario-contato/usuario-contato";
import { UsuarioDocumentoPage } from "../pages/usuario-documento/usuario-documento";
import { UsuarioEnderecoPage } from "../pages/usuario-endereco/usuario-endereco";
import { UsuarioProgramaSocialPage } from "../pages/usuario-programa-social/usuario-programa-social";
import { LoginPage } from "./../pages/login/login";
import { ConfiguracoesPage } from "../pages/configuracoes/configuracoes";
import { DatabaseProvider } from "../providers/database/database";
import { Push, PushOptions, PushObject } from "@ionic-native/push";
import { environment } from "../environment";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;
  @ViewChild("nav") nav: NavController;
  tipoRede;
  exibeNotifica = environment.exibeNotifica

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    public toastCtrl: ToastController,
    private splashScreen: SplashScreen,
    public _app: App,
    public menuCtrl: MenuController,
    private k: Keyboard,
    private keycloakService: KeycloakService,
    private databaseProvider: DatabaseProvider,
    public push: Push,
    public alertCtrl: AlertController
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.databaseProvider.createDatabase();

      statusBar.hide();

      if (keycloakService.isAuthenticated()) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      this.pushsetup();
    });
    // let appEl = <HTMLElement>document.getElementsByTagName("ION-APP")[0],
    //   appElHeight = appEl.clientHeight;

    this.k.disableScroll(false);

    if (this.platform.is("android")) {
      // window.addEventListener("native.keyboardshow", e => {
      //     let appEl = <HTMLElement>document.getElementsByTagName("ION-APP")[0];
      //     let appElHeight = appEl.clientHeight;
      //     appEl.style.height = appElHeight - (<any>e).keyboardHeight + "px";
      // });

      // window.addEventListener("native.keyboardhide", () => {
      //     let appEl = <HTMLElement>document.getElementsByTagName("ION-APP")[0];
      //     appEl.style.height = "100%";
      // });

      window.addEventListener('native.keyboardshow', (e) => {
          let buttonEl = <HTMLElement>(document.getElementById('button'));
          if (buttonEl) {
              buttonEl.style.paddingBottom = '400px';
              setTimeout(function () {
                  var itemList = document.getElementById('card');
                  itemList.scrollTop = itemList.scrollHeight;
              }, 10);
          }
      });

      window.addEventListener('native.keyboardhide', () => {
          console.log('native keyboardhide');
          let appEl = <HTMLElement>(document.getElementById('button'));
          if (appEl)
              appEl.style.paddingBottom = '0px';
      });
    }
  }

  pushsetup() {
    const options: PushOptions = {
        android: {
            icon: 'notification_icon'
        }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => { });

    pushObject.subscribe('atipeapp').then(() => {
        console.log('Subscribed on ATIPEAPP sucessfully');
    }).catch(e => {
        console.error('Error to subscribe at ATIPEAPP', e);
    });

    pushObject.on("notification").subscribe((notification: any) => {
        if (notification.additionalData.foreground) {
            let youralert = this.alertCtrl.create({
                title: notification.label,
                message: notification.message,
            });
            youralert.present();
        }
    });
}

  ionViewDidLoad() {
    //console.log("ionViewDidLoad app component");
    this.splashScreen.hide();
  }

  navTo(to) {
    this.menuCtrl.close().then(() => {
      if (to == "cadastro") {
        this.rootPage = CadastrarPage;
      } else if (to == "perfil") {
        this.nav.push(ProfilePage);
      } else if (to == "endereco") {
        this.nav.push(UsuarioEnderecoPage);
      } else if (to == "contato") {
        this.nav.push(UsuarioContatoPage);
      } else if (to == "documento") {
        this.nav.push(UsuarioDocumentoPage);
      } else if (to == "programa") {
        this.nav.push(UsuarioProgramaSocialPage);
      } else if (to == "perfil") {
        this.nav.push(ProfilePage);
      } else if (to == "sair") {
        this.keycloakService.logout();
        this.nav.setRoot(LoginPage);
      } else if (to == "logar") {
        this.nav.setRoot(LoginPage);
      } else if (to == "configuracoes") {
        this.nav.push(ConfiguracoesPage);
      }
    });
  }

  isLogged(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: position
    });

    toast.present(toast);
  }
}
