import { HttpErrorResponse } from "@angular/common/http";
import { NgModel } from "@angular/forms";
import emojiRegex from "emoji-regex";
import { NavController, ViewController } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
import { AlertProvider } from "../providers/alert/alert";

export const marcas = [
  "*Marca",
  "Samsung",
  "Motorola",
  "LG",
  "Asus",
  "Alcatel",
  "Apple",
  "Multilaser",
  "Sony"
].sort(function(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

export const operadoras = [
  "*Operadora",
  "Vivo",
  "Claro",
  "Oi",
  "TIM",
  "Sercomtel",
  "Nextel"
].sort(function(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

export const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
].sort(function(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
});

export function isInvalidModel(form, model: NgModel) {
  return (model.dirty || model.touched || form.submitted) && model.invalid;
}

export function stringToDate(str: string | Date): Date {
  if (!!str && typeof str === "string") {
    if (str.startsWith("/Date")) {
      const time = parseInt(str.substring(6, str.indexOf("-")), 10);
      return new Date(time);
    } else if (str.match(/^\d+$/g)) {
      return new Date(parseInt(str, 10));
    } else if (
      str.match(
        /^\d{4}-[01]\d-[0-3]\d(T[0-2]\d:[0-5]\d(:[0-5]\d(.\d{3})?)?Z?)?$/g
      )
    ) {
      return new Date(str);
    }
  } else if (str instanceof Date) {
    return str;
  }

  return null;
}

export function removeEmoji(text: string): string {
  return text.replace(emojiRegex(), "");
}

export function removeAcentos(text: string): string {
  const acentos =
    "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
  const caracteres =
    "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let semAcentos = "";
  for (let i = 0; i < text.length; i++) {
    const iAcento = acentos.indexOf(text[i]);
    if (iAcento > -1) {
      semAcentos += caracteres[iAcento];
    } else {
      semAcentos += text[i];
    }
  }

  return semAcentos;
}

export function getErrorMessage(e: any): string {
  if (!e) {
    return "Falha ao executar a operação!";
  } else if (typeof e === "string") {
    return e;
  } else if (!e.error) {
    return e.toString();
  } else if (typeof e.error === "string") {
    return e.error;
  }
  const error = e.error[0];
  if (!!error) {
    if (!!error.error) {
      return error.error;
    } else if (typeof error.error_description !== "string") {
      let message = "";
      for (const description of error.error_description) {
        try {
          message += `${JSON.parse(description).msg} `;
        } catch {
          message += `${description} `;
        }
      }

      return message;
    } else {
      return error.error_description;
    }
  } else {
    return "Falha ao executar a operação!";
  }
}

export const getThemeColor = (index: number): string => {
  let colors: string[] = [
    "#4d79cc",
    "#00a7d9",
    "#c75248",
    "#a7c369",
    "#ce1b0c",
    "#a3ab68",
    "#b17bd9",
    "#e0aa62",
    "#7888a7",
    "#e88600",
    "#5eb6d1"
    // ,
    // "#000000"
  ];
  return colors[index % colors.length];
};

export const applyPhoneMask = (numb: string) => {
  if (!numb) return "";
  let raw = numb
    .split("(")
    .join("")
    .split(")")
    .join("")
    .split("-")
    .join("");
  let raw_arr = raw.split("");
  let count = 0;
  let ret = new Array();
  tel9Mask.forEach(element => {
    if (typeof element != "string") {
      ret.push(raw_arr[count]);
      count++;
    } else {
      ret.push(element);
    }
  });
  return ret.join("");
};

export const applyMask = (param: string, mask: any[]) => {
  if (!param) return "";
  let raw_arr = param.split("");
  let count = 0;
  let ret = new Array();
  mask.forEach(element => {
    if (typeof element != "string") {
      ret.push(raw_arr[count]);
      count++;
    } else {
      ret.push(element);
    }
  });
  return ret.join("");
};

export const applyRgMask = (numb: number) => {
  if (!numb) return "";
  let raw = `${numb}`.split("");

  let ret: string[] = [];
  let count = 0;
  for (let i = raw.length - 1; i >= 0; i--) {
    const element = raw[i];

    ret.unshift(element);
    count++;
    if (count % 3 == 0 && count != raw.length && count != 0) {
      ret.unshift(".");
    }
  }
  return ret.join("");
};

export const tel9Mask = [
  "(",
  /\d/, //ddd
  /\d/,
  ")",
  " ",
  /\d/, //9 digitos
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

export const tel8Mask = [
  "(",
  /\d/, //ddd
  /\d/,
  ")",
  " ",
  /[2-8]/, // 8digitos
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

export const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/
];

export const isLogged = (): boolean => {
  if (localStorage.getItem("dados-cidadao-logado")) {
    return true;
  } else {
    return false;
  }
};

export const getCidadaoLogado = (): any => {
  if (localStorage.getItem("dados-cidadao-logado")) {
    return JSON.parse(localStorage.getItem("dados-cidadao-logado"));
  } else {
    return null;
  }
};

export const formantDate = (param): string => {
  if (param) {
    let data: Date = null;
    if (typeof param == "string") {
      const a = param.split(/[^0-9]/);
      let params: number[] = [];
      a.forEach(element => {
        params.push(parseInt(element));
      });
      if (params.length == 3) {
        data = new Date(params[0], params[1] - 1, params[2]);
      } else {
        data = new Date(
          params[0],
          params[1] - 1,
          params[2],
          params[3],
          params[4],
          params[5]
        );
      }
    } else if (param instanceof Date) {
      data = param;
    }

    return `${doubleDigit(data.getDate())}/${doubleDigit(
      data.getMonth() + 1
    )}/${data.getFullYear()}`;
  }
};

export const doubleDigit = param => {
  if (param < 10) {
    return `0${param}`;
  } else {
    return param;
  }
};

export const formatHour = param => {
  if (param) {
    const a = param.split(/[^0-9]/);
    const date = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);

    return `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`;
  }
};

export const primengToTextMask = (mask: string): (string | RegExp)[] => {
  return mask.split("").map(char => {
    switch (char) {
      case "a":
        return /[a-zA-Z]/;
      case "9":
        return /\d/;
      case "*":
        return /[a-zA-Z0-9]/;
      default:
        return escapeRegExp(char);
    }
  });
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const getPageIndex = (
  views: Array<ViewController>,
  view: string
): any => {
  let retorno: number = -1;

  for (let index = 0; index < views.length; index++) {
    const element: ViewController = views[index];

    if (element.component.nome == view) {
      retorno = index;
    }
  }

  return retorno;
};

export const parseString2Date = (param: string): Date => {
  if (!param) return null;
  let date: string[] = param.split("-");
  return new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]));
};

export function endSession(
  navControl: NavController,
  alertCtrl: AlertProvider,
  error: HttpErrorResponse
) {
  if ([401, 403].indexOf(error.status) >= 0) {
    alertCtrl.showError({
      subTitle: "Atenção.",
      msg: "A sua sessão expirou, favor efetue o login novamente.",
      buttons: [
        {
          text: "OK",
          handler: () => {
            localStorage.removeItem("cidadaoLogado");
            //this.rootPage = LoginPage;
            navControl.setRoot(LoginPage);
          }
        }
      ]
    });
  } else {
    alertCtrl.showError({
      subTitle: "Atenção.",
      msg: getErrorMessage(error),
      buttons: [
        {
          text: "OK"
        }
      ]
    });
  }
}
