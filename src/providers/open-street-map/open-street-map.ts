import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from "@angular/common/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

export class OSMLocal {

    public placeId: string;
    public license: string;
    public osmType: string;
    public osmId: string;
    public boundingbox: number[];
    public lat: number;
    public lon: number;
    public displayName: string;
    public class: string;
    public type: string;
    public importance: number;
    public address: OSMEndereco;

    public set place_id(placeId) {
        this.placeId = placeId;
    }
    public set osm_type(osmType) {
        this.osmType = osmType;
    }
    public set osm_id(osmId) {
        this.osmId = osmId;
    }
    public set display_name(displayName) {
        this.displayName = displayName;
    }

    constructor(lat?: number, lon?: number) {
        this.lat = lat;
        this.lon = lon;
    }

}

export class OSMEndereco {
    public houseNumber: string;
    public road: string;
    public town: string;
    public suburb: string;
    public cityDistrict: string;
    public city: string;
    public county: string;
    public stateDistrict: string;
    public state: string;
    public postcode: string;
    public country: string;
    public countryCode: string;

    public set house_number(houseNumber: string) {
        this.houseNumber = houseNumber;
    }
    public set city_district(cityDistrict: string) {
        this.cityDistrict = cityDistrict;
    }
    public set state_district(stateDistrict: string) {
        this.stateDistrict = stateDistrict;
    }
    public set country_code(countryCode: string) {
        this.countryCode = countryCode;
    }
}

@Injectable()
export class OpenStreetMapProvider {

    public get tileApiUrl(): string {
        return this._tileApiUrl;
    }

    private _tileApiUrl: string = `${environment.openStreetMapTileEndpoint}/{z}/{x}/{y}.png`;
    private _nominatumApiUrl: string = environment.openStreetMapNominatimEndpoint;

    constructor(private http: HttpClient) { }

    public search(endereco: OSMEndereco): Observable<OSMLocal[]> {
        const queryBase = `${endereco.country || ''},${endereco.state || ''},${endereco.city || ''}`;
        const houseNumber = parseInt(endereco.houseNumber);
        const params1 = {
            q: `${queryBase},${endereco.suburb || ''},${endereco.road || ''},${houseNumber || ''}`
        };
        const params2 = {
            q: `${queryBase},${endereco.road || ''},${houseNumber || ''}`
        };

        return this.http
            .get<OSMLocal[]>(`${this._nominatumApiUrl}/search`, { params: this.getParams(params1) })
            .switchMap((locais: OSMLocal[]) => {
                if (!!locais && locais.length > 0) {
                    return Observable.of(locais);
                }
                return this.http.get<OSMLocal[]>(`${this._nominatumApiUrl}/search`, { params: this.getParams(params2) });
            });
    }

    public reverse(local: OSMLocal): Observable<OSMEndereco> {
        const params = {};
        if (!!local.osmId) {
            params['osm_type'] = 'W';
            params['osm_id'] = local.osmId;
        } else if (!!local.lat && !!local.lon) {
            params['lat'] = local.lat;
            params['lon'] = local.lon;
        } else {
            return Observable.of(null);
        }
        return this.http
            .get<OSMLocal>(`${this._nominatumApiUrl}/reverse`, { params: this.getParams(params) })
            .map((localRev: OSMLocal) => localRev.address);
    }

    private getParams(params: { [key: string]: string }): HttpParams {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('format', 'json');
        for (const param of Object.keys(params)) {
            httpParams = httpParams.append(param, params[param]);
        }

        return httpParams;
    }

}