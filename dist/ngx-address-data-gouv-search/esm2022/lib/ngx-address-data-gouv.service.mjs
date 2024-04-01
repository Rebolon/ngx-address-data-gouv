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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.2", ngImport: i0, type: Service, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.2", ngImport: i0, type: Service, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.2", ngImport: i0, type: Service, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtZGF0YS1nb3V2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYWRkcmVzcy1kYXRhLWdvdXYtc2VhcmNoL3NyYy9saWIvbmd4LWFkZHJlc3MtZGF0YS1nb3V2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFjLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTTNELE1BQU0sT0FBTyxPQUFPO0lBQ2xCLElBQUksR0FBRyxrQ0FBa0MsQ0FBQztJQUUxQzs7T0FFRztJQUNILElBQUksR0FBRyxDQUFDLEdBQVc7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELFlBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQUcsQ0FBQztJQUU3QixHQUFHLENBQUMsV0FBZ0I7UUFDNUIsTUFBTSxPQUFPLEdBQUc7WUFDZCxNQUFNLEVBQUUsSUFBSSxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUM7U0FDN0QsQ0FBQztRQUVGLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtZQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDMUY7UUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO1FBRUQsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUc7YUFDWixPQUFPLENBQWlDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQzthQUN2RSxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQzVCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDbUIsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUNKLElBQVksRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQXFDLGFBQWEsRUFBRSxlQUFvQixDQUFDO1FBRWxHLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7OEdBaERVLE9BQU87a0hBQVAsT0FBTyxjQUZOLE1BQU07OzJGQUVQLE9BQU87a0JBSG5CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFTVBUWSwgbWFwLCBPYnNlcnZhYmxlLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWRkcmVzc0FQSVByb3BlcnRpZXMsIEFkZHJlc3NBUElSZXN1bHQgfSBmcm9tICcuL25neC1hZGRyZXNzLWRhdGEtZ291dic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAjdXJpID0gJ2h0dHBzOi8vYXBpLWFkcmVzc2UuZGF0YS5nb3V2LmZyJztcblxuICAvKipcbiAgICogQWxsb3cgdG8gY2hhbmdlIHRoZSB1cmkgaWYgeW91IGhvc3QgeW91ciBvd24gYWRkcmVzc0RhdGFHb3V2IHNlcnZpY2VcbiAgICovXG4gIHNldCB1cmkodXJpOiBzdHJpbmcpIHtcbiAgICB0aGlzLiN1cmkgPSB1cmk7XG4gIH1cblxuICBnZXQgdXJsU2VhcmNoKCkge1xuICAgIHJldHVybiBgJHt0aGlzLiN1cml9L3NlYXJjaC9gO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEh0dHBDbGllbnQpIHt9XG5cbiAgcHJvdGVjdGVkIGdldChsb2FkT3B0aW9uczogYW55KTogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgcGFyYW1zOiBuZXcgSHR0cFBhcmFtcygpLnNldCgnYXV0b2NvbXBsZXRlJywgJzAnKS5zZXQoJ2xpbWl0JywgJzUnKSxcbiAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKSxcbiAgICB9O1xuXG4gICAgaWYgKGxvYWRPcHRpb25zLmF1dG9jb21wbGV0ZSkge1xuICAgICAgb3B0aW9ucy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcy5zZXQoJ2F1dG9jb21wbGV0ZScsIGxvYWRPcHRpb25zLmF1dG9jb21wbGV0ZS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBpZiAobG9hZE9wdGlvbnMubGltaXQpIHtcbiAgICAgIG9wdGlvbnMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXMuc2V0KCdsaW1pdCcsIGxvYWRPcHRpb25zLmxpbWl0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGlmIChsb2FkT3B0aW9ucy5xKSB7XG4gICAgICBvcHRpb25zLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zLnNldCgncScsIGxvYWRPcHRpb25zLnEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXBpXG4gICAgICAucmVxdWVzdDx7ZmVhdHVyZXM6IEFkZHJlc3NBUElSZXN1bHRbXX0+KCdHRVQnLCB0aGlzLnVybFNlYXJjaCwgb3B0aW9ucylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGRhdGEpID0+IGRhdGEuZmVhdHVyZXMpLFxuICAgICAgICBzaGFyZVJlcGxheSgxKVxuICAgICAgKSBhcyBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT47XG4gIH1cblxuICBzZWFyY2goXG4gICAgdGV4dDogc3RyaW5nLCBsaW1pdCA9IDUsIHR5cGU6IEFkZHJlc3NBUElQcm9wZXJ0aWVzWyd0eXBlJ10gPSAnaG91c2VudW1iZXInLCBhdXRvY29tcGxldGU6IDB8MSA9IDBcbiAgKTogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+IHtcbiAgICByZXR1cm4gdGhpcy5nZXQoe3E6IHRleHQsIGxpbWl0LCB0eXBlLCBhdXRvY29tcGxldGV9KTtcbiAgfVxufVxuIl19