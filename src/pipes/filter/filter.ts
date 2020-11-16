import { Pipe, PipeTransform } from "@angular/core";
import { removeAcentos } from "../../util/common";

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(list: any[], text: string, propName: string = '', ignoreAccent: boolean = false) {
        if (!text) {
            return list;
        }
        const search = ignoreAccent ? removeAcentos(text.toLowerCase()) : text.toLowerCase();
        return list
            .filter(value => {
                if (!!value[propName]) {
                    const prop = ignoreAccent ? removeAcentos(value[propName].toLowerCase()) : value[propName].toLowerCase();
                    return prop.includes(search);
                }
                return false;
            });
    }
}
