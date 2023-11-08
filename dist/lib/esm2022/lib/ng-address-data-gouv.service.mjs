import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { EMPTY, map, shareReplay } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class Service {
    /**
     * Allow to change the uri if you host your own addressDataGouv service
     */
    set uri(uri) {
        this._uri = uri;
    }
    get urlSearch() {
        return `${this._uri}/search/`;
    }
    constructor(api) {
        this.api = api;
        this._uri = 'https://api-adresse.data.gouv.fr';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: Service, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYi9zcmMvbGliL25nLWFkZHJlc3MtZGF0YS1nb3V2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3pFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLEdBQUcsRUFBYyxXQUFXLEVBQUMsTUFBTSxNQUFNLENBQUM7OztBQU0xRSxNQUFNLE9BQU8sT0FBTztJQUdsQjs7T0FFRztJQUNILElBQUksR0FBRyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBYjNCLFNBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQWFaLENBQUM7SUFFN0IsR0FBRyxDQUFDLFdBQWdCO1FBQzVCLE1BQU0sT0FBTyxHQUFHO1lBQ2QsTUFBTSxFQUFFLElBQUksVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztZQUNuRSxPQUFPLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO1NBQzdELENBQUM7UUFFRixJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDNUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzFGO1FBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUksV0FBVyxDQUFDLENBQUMsRUFBRTtZQUNqQixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1osT0FBTyxDQUFpQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7YUFDdkUsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUM1QixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ21CLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFZLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFxQyxhQUFhLEVBQUUsZUFBb0IsQ0FBQztRQUVsRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDOzhHQWhEVSxPQUFPO2tIQUFQLE9BQU8sY0FGTixNQUFNOzsyRkFFUCxPQUFPO2tCQUhuQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgRU1QVFksIG1hcCwgT2JzZXJ2YWJsZSwgc2hhcmVSZXBsYXl9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBZGRyZXNzQVBJUHJvcGVydGllcywgQWRkcmVzc0FQSVJlc3VsdH0gZnJvbSAnLi9uZy1hZGRyZXNzLWRhdGEtZ291dic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICBwcml2YXRlIF91cmkgPSAnaHR0cHM6Ly9hcGktYWRyZXNzZS5kYXRhLmdvdXYuZnInO1xuXG4gIC8qKlxuICAgKiBBbGxvdyB0byBjaGFuZ2UgdGhlIHVyaSBpZiB5b3UgaG9zdCB5b3VyIG93biBhZGRyZXNzRGF0YUdvdXYgc2VydmljZVxuICAgKi9cbiAgc2V0IHVyaSh1cmk6IHN0cmluZykge1xuICAgIHRoaXMuX3VyaSA9IHVyaTtcbiAgfVxuXG4gIGdldCB1cmxTZWFyY2goKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuX3VyaX0vc2VhcmNoL2A7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogSHR0cENsaWVudCkge31cblxuICBwcm90ZWN0ZWQgZ2V0KGxvYWRPcHRpb25zOiBhbnkpOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBwYXJhbXM6IG5ldyBIdHRwUGFyYW1zKCkuc2V0KCdhdXRvY29tcGxldGUnLCAnMCcpLnNldCgnbGltaXQnLCAnNScpLFxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKCkuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpLFxuICAgIH07XG5cbiAgICBpZiAobG9hZE9wdGlvbnMuYXV0b2NvbXBsZXRlKSB7XG4gICAgICBvcHRpb25zLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zLnNldCgnYXV0b2NvbXBsZXRlJywgbG9hZE9wdGlvbnMuYXV0b2NvbXBsZXRlLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGlmIChsb2FkT3B0aW9ucy5saW1pdCkge1xuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcy5zZXQoJ2xpbWl0JywgbG9hZE9wdGlvbnMubGltaXQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgaWYgKGxvYWRPcHRpb25zLnEpIHtcbiAgICAgIG9wdGlvbnMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXMuc2V0KCdxJywgbG9hZE9wdGlvbnMucSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGlcbiAgICAgIC5yZXF1ZXN0PHtmZWF0dXJlczogQWRkcmVzc0FQSVJlc3VsdFtdfT4oJ0dFVCcsIHRoaXMudXJsU2VhcmNoLCBvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoZGF0YSkgPT4gZGF0YS5mZWF0dXJlcyksXG4gICAgICAgIHNoYXJlUmVwbGF5KDEpXG4gICAgICApIGFzIE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdFtdPjtcbiAgfVxuXG4gIHNlYXJjaChcbiAgICB0ZXh0OiBzdHJpbmcsIGxpbWl0ID0gNSwgdHlwZTogQWRkcmVzc0FQSVByb3BlcnRpZXNbJ3R5cGUnXSA9ICdob3VzZW51bWJlcicsIGF1dG9jb21wbGV0ZTogMHwxID0gMFxuICApOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldCh7cTogdGV4dCwgbGltaXQsIHR5cGUsIGF1dG9jb21wbGV0ZX0pO1xuICB9XG59XG4iXX0=