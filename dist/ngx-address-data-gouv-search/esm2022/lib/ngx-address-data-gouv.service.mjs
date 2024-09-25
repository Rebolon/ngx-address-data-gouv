import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, shareReplay } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Service {
    #uri = 'https://api-adresse.data.gouv.fr';
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri) {
        this.#uri = uri;
    }
    get urlSearch() {
        return `${this.#uri}/search/`;
    }
    constructor(api) {
        this.api = api;
    }
    get(loadOptions) {
        const options = {
            params: new HttpParams().set('autocomplete', '0').set('limit', '5'),
            headers: new HttpHeaders().set('Accept', 'application/json'),
        };
        if (loadOptions.autocomplete) {
            options.params = options.params.set('autocomplete', loadOptions.autocomplete.toString());
        }
        if (loadOptions.limit) {
            options.params = options.params.set('limit', loadOptions.limit.toString());
        }
        if (loadOptions.q) {
            options.params = options.params.set('q', loadOptions.q);
        }
        else {
            return EMPTY;
        }
        return this.api
            .request('GET', this.urlSearch, options)
            .pipe(map((data) => data.features), shareReplay(1));
    }
    search(text, limit = 5, type = 'housenumber', autocomplete = 0) {
        return this.get({ q: text, limit, type, autocomplete });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.5", ngImport: i0, type: Service, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.5", ngImport: i0, type: Service, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.5", ngImport: i0, type: Service, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtZGF0YS1nb3V2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWRkcmVzcy1kYXRhLWdvdXYtc2VhcmNoL3NyYy9saWIvbmd4LWFkZHJlc3MtZGF0YS1nb3V2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFjLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTTNELE1BQU0sT0FBTyxPQUFPO0lBQ2xCLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQUUxQzs7T0FFRztJQUNILElBQUksR0FBRyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQUcsQ0FBQztJQUU3QixHQUFHLENBQUMsV0FBZ0I7UUFDNUIsTUFBTSxPQUFPLEdBQUc7WUFDZCxNQUFNLEVBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7U0FDN0QsQ0FBQztRQUVGLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFFRCxJQUFJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1osT0FBTyxDQUFpQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7YUFDdkUsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUM1QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ21CLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFZLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFxQyxhQUFhLEVBQUUsZUFBb0IsQ0FBQztRQUVsRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzhHQWhEVSxPQUFPO2tIQUFQLE9BQU8sY0FGTixNQUFNOzsyRkFFUCxPQUFPO2tCQUhuQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRU1QVFksIG1hcCwgT2JzZXJ2YWJsZSwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFkZHJlc3NBUElQcm9wZXJ0aWVzLCBBZGRyZXNzQVBJUmVzdWx0IH0gZnJvbSAnLi9uZ3gtYWRkcmVzcy1kYXRhLWdvdXYnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlIHtcbiAgI3VyaSA9ICdodHRwczovL2FwaS1hZHJlc3NlLmRhdGEuZ291di5mcic7XG5cbiAgLyoqXG4gICAqIEFsbG93IHRvIGNoYW5nZSB0aGUgdXJpIGlmIHlvdSBob3N0IHlvdXIgb3duIGFkZHJlc3NEYXRhR291diBzZXJ2aWNlXG4gICAqL1xuICBzZXQgdXJpKHVyaTogc3RyaW5nKSB7XG4gICAgdGhpcy4jdXJpID0gdXJpO1xuICB9XG5cbiAgZ2V0IHVybFNlYXJjaCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy4jdXJpfS9zZWFyY2gvYDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBIdHRwQ2xpZW50KSB7fVxuXG4gIHByb3RlY3RlZCBnZXQobG9hZE9wdGlvbnM6IGFueSk6IE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdFtdPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHBhcmFtczogbmV3IEh0dHBQYXJhbXMoKS5zZXQoJ2F1dG9jb21wbGV0ZScsICcwJykuc2V0KCdsaW1pdCcsICc1JyksXG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKS5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyksXG4gICAgfTtcblxuICAgIGlmIChsb2FkT3B0aW9ucy5hdXRvY29tcGxldGUpIHtcbiAgICAgIG9wdGlvbnMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXMuc2V0KCdhdXRvY29tcGxldGUnLCBsb2FkT3B0aW9ucy5hdXRvY29tcGxldGUudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgaWYgKGxvYWRPcHRpb25zLmxpbWl0KSB7XG4gICAgICBvcHRpb25zLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zLnNldCgnbGltaXQnLCBsb2FkT3B0aW9ucy5saW1pdC50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBpZiAobG9hZE9wdGlvbnMucSkge1xuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcy5zZXQoJ3EnLCBsb2FkT3B0aW9ucy5xKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFwaVxuICAgICAgLnJlcXVlc3Q8e2ZlYXR1cmVzOiBBZGRyZXNzQVBJUmVzdWx0W119PignR0VUJywgdGhpcy51cmxTZWFyY2gsIG9wdGlvbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChkYXRhKSA9PiBkYXRhLmZlYXR1cmVzKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSlcbiAgICAgICkgYXMgT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+O1xuICB9XG5cbiAgc2VhcmNoKFxuICAgIHRleHQ6IHN0cmluZywgbGltaXQgPSA1LCB0eXBlOiBBZGRyZXNzQVBJUHJvcGVydGllc1sndHlwZSddID0gJ2hvdXNlbnVtYmVyJywgYXV0b2NvbXBsZXRlOiAwfDEgPSAwXG4gICk6IE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHtxOiB0ZXh0LCBsaW1pdCwgdHlwZSwgYXV0b2NvbXBsZXRlfSk7XG4gIH1cbn1cbiJdfQ==