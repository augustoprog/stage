import {
  HttpClient,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { RG } from "./rg.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { environment } from "../../environment";
import { KeycloakService } from "../../keycloak";
/*
  Generated class for the RgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var jsSHA: any;

@Injectable()
export class RgProvider {
  constructor(public http: HttpClient, private keycloakService: KeycloakService) {
    //console.log("Hello RgProvider Provider");
  }

  ativarToken(obj: any): Observable<any> {
    return this.http.post(environment.ativarToken, obj);
  }

  visualizarRg(obj: any): Observable<HttpResponse<any>> {
    return this.http.post(environment.visualizarRg, obj, {
      observe: "response",
      responseType: "blob"
    });
  }

  JsonFormatter = {
    stringify: function(cipherParams) {
      // create json object with ciphertext
      var jsonObj: any = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
      }; // optionally add iv and salt i
      if (cipherParams.iv) {
        jsonObj.iv = cipherParams.iv.toString();
      }
      if (cipherParams.salt) {
        jsonObj.s = cipherParams.salt.toString();
      } // stringify json object
      return JSON.stringify(jsonObj);
    },
    parse: function(jsonStr) {
      // parse json string
      var jsonObj = JSON.parse(jsonStr); // extract ciphertext from json object, and create cipher params object
      var cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
      }); // optionally extract iv and salt
      if (jsonObj.iv) {
        cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
      }
      if (jsonObj.s) {
        cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
      }
      return cipherParams;
    }
  };

  encrypt(pin: string, rgObj: RG) {
    let rg: number = rgObj.numeroFicha;
    let hash: any = this.getHash(pin, rg.toString());

    let rgHash = CryptoJS.AES.encrypt(JSON.stringify(rgObj), hash, {
      format: this.JsonFormatter
    });
    //var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
    rgHash = rgHash.toString(CryptoJS.enc.HEX);
    // console.log("rgHash ", rgHash);

    return rgHash;
  }

  save(rg: any): Observable<boolean> {
    return this.getAll()
      .map(rgs => {
        const duplicated: any[] = rgs.filter(item => item.rg.numero == rg.rg.numero);

        if (duplicated && duplicated.length != 0) {
          return false;
        } else {
          rgs.push(rg);

          localStorage["RGs"] = btoa(JSON.stringify(rgs));
          return true;
        }
      });
  }

  getAll(): Observable<any[]> {
    let rgsString = localStorage.getItem("RGs");
    if (
      rgsString &&
      (rgsString != "null" && rgsString != "undefined" && rgsString != "")
    ) {
      return this.keycloakService.getCidadaoLogado()
        .map(cidadao => {
          const rgs = JSON.parse(atob(rgsString));
          return rgs.filter(
            item =>
              item.email == cidadao.email
          );
        });
    }

    return Observable.of([]);
  }

  remove(rg: any): Observable<any> {
    return this.getAll()
      .do(rgs => {
        rgs = rgs.filter(item => {
          return item.rg.numero != rg.rg.numero;
        });

        localStorage["RGs"] = btoa(JSON.stringify(rgs));
      });
  }

  decrypt(pin: string, item: any) {
    let hash = this.getHash(pin, item.rg.numero.toString());
    let decrypted = CryptoJS.AES.decrypt(item.obj, hash, {
      format: this.JsonFormatter
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getHash(pin: string, rg: string) {
    let pinDigits = pin.split("");
    let rgDigits = rg.split("");
    let allDigits = rgDigits.concat(pinDigits);
    let sum = 0;
    for (let i = 0; i < allDigits.length; i++) {
      sum += Number.parseInt(allDigits[i]);
    }

    let times: number = (sum % 4) + 1;
    let hash: any = pin;
    for (let j = 0; j < times; j++) {
      hash = CryptoJS.SHA256(hash).toString(CryptoJS.enc.Hex);
      //console.log("Hash ", j, hash);
    }
    return hash;
  }

  dec2hex(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  }
  hex2dec(s) {
    return parseInt(s, 16);
  }

  base32tohex(base32) {
    const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";

    for (let i = 0; i < base32.length; i++) {
      const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += this.leftpad(val.toString(2), 5, "0");
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
      const chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
  }

  leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }

  updateOtp(rg): { countDown; otp } {
    let key = this.base32tohex(rg.secret);
    let epoch = Math.round(new Date().getTime() / 1000.0);

    let countDown = rg.period - (epoch % rg.period);

    let time = this.leftpad(
      this.dec2hex(Math.floor(epoch / rg.period)),
      16,
      "0"
    );

    var shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(key, "HEX");
    shaObj.update(time);
    var hmac = shaObj.getHMAC("HEX");

    let offset = this.hex2dec(hmac.substring(hmac.length - 1));

    let otp =
      (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) +
      "";
    otp = otp.substr(otp.length - 6, 6);
    return { otp, countDown };
  }
}
