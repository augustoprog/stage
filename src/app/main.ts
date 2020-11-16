import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { KeycloakService } from "../keycloak";
import { AppModule } from "./app.module";

enableProdMode();

KeycloakService.init()
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(e => console.error("kc init", e));

if (window.localStorage.getItem("tipoUnidade") === null) {
  window.localStorage.setItem("tipoUnidade", "");
}
