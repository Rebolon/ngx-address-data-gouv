import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Service } from './ng-address-data-gouv.service';
import * as i0 from "@angular/core";
import * as i1 from "./ng-address-data-gouv.service";
import * as i2 from "@angular/common";
export class AddressSearchComponent {
    constructor(service) {
        this.service = service;
        // data store containers
        this.selectedAddress$ = new BehaviorSubject({});
        this.listAddresses$ = new Subject();
        this.listAddresses = this.listAddresses$.asObservable();
        this.listAddressesForStylish = this.listAddresses
            .pipe(
        // prevent the border style to be displayed when there is an emition of empty/null/undefined/empty array
        filter((data) => data.length > 0));
        this.inputValue = new BehaviorSubject("");
        // components API
        this.loaderSize = 15;
        this.width = 250;
        this.placeholder = '';
        this.label = '';
        this.id = 'ri-address-search-component-' + (new Date()).getTime();
        this.uri = '';
        this.isLoading = new ReplaySubject(1);
        this.addressFound = this.selectedAddress$.asObservable();
        // Memory leak prevention
        this.ngUnsubscribe = new Subject();
    }
    ngOnInit() {
        if (this.uri) {
            this.service.uri = this.uri;
        }
        this.isLoading.next(false);
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.isLoading.next(true));
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe), filter((value) => value.trim().length > 3, filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label)), debounceTime(1000), switchMap((data) => this.service.search(data))).subscribe((data) => {
            this.listAddresses$.next(data);
            this.isLoading.next(false);
        });
    }
    // clean memory
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    onKeyUp(event) {
        const value = event.currentTarget.value;
        if (value === this.inputValue.getValue()) {
            return;
        }
        this.inputValue.next(value);
    }
    // @todo : is there a way to code thos 3 lines in a way where order is not important ? here if i move the
    // inputValue.next then it can call again the Api
    selectAddress(address) {
        // save the selected address
        this.selectedAddress$.next(address);
        // clear the list
        this.listAddresses$.next([]);
        // change value of the input
        this.inputValue.next(address.properties.label);
    }
}
AddressSearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: AddressSearchComponent, deps: [{ token: i1.Service }], target: i0.ɵɵFactoryTarget.Component });
AddressSearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.3", type: AddressSearchComponent, selector: "ng-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
        Service
    ], ngImport: i0, template: `
    <label for="{{id}}" *ngIf="label">{{label}}</label>
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
       <li *ngFor="let addressList of listAddresses | async; let isOdd = odd;"
           (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
    </ul>
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-address-data-gouv-search', template: `
    <label for="{{id}}" *ngIf="label">{{label}}</label>
    <input 
      id="{{id}}" 
      [placeholder]="placeholder" 
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
       <li *ngFor="let addressList of listAddresses | async; let isOdd = odd;"
           (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
    </ul>
  `, providers: [
                        Service
                    ], styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Service }]; }, propDecorators: { loaderSize: [{
                type: Input
            }], width: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], id: [{
                type: Input
            }], uri: [{
                type: Input
            }], isLoading: [{
                type: Output
            }], addressFound: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvbmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBRVosTUFBTSxFQUlOLGFBQWEsRUFDYixPQUFPLEVBQ1AsU0FBUyxFQUNULFNBQVMsRUFFVixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQTZDdkQsTUFBTSxPQUFPLHNCQUFzQjtJQXlCakMsWUFBc0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQXhCdEMsd0JBQXdCO1FBQ2QscUJBQWdCLEdBQXNDLElBQUksZUFBZSxDQUFDLEVBQXNCLENBQUMsQ0FBQztRQUNsRyxtQkFBYyxHQUFnQyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUNyRyxrQkFBYSxHQUFtQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25GLDRCQUF1QixHQUFtQyxJQUFJLENBQUMsYUFBYTthQUN6RSxJQUFJO1FBQ0gsd0dBQXdHO1FBQ3hHLE1BQU0sQ0FBQyxDQUFDLElBQXdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3RELENBQUM7UUFDTSxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLGlCQUFpQjtRQUNSLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUNaLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBRyxF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RVUsc0JBQXNCO3VHQUF0QixzQkFBc0IsaVBBSnRCO1FBQ1QsT0FBTztLQUNSLDBCQXRDUzs7Ozs7Ozs7Ozs7Ozs7R0FjVDsyRkEwQlUsc0JBQXNCO2tCQTFDbEMsU0FBUzsrQkFDRSw2QkFBNkIsWUFDN0I7Ozs7Ozs7Ozs7Ozs7O0dBY1QsYUFzQlU7d0JBQ1QsT0FBTztxQkFDUjs4RkFlUSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGRlYm91bmNlVGltZSxcbiAgZGlzdGluY3QsXG4gIGZpbHRlcixcbiAgZnJvbUV2ZW50LFxuICBtYXAsXG4gIE9ic2VydmFibGUsXG4gIFJlcGxheVN1YmplY3QsXG4gIFN1YmplY3QsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZVVudGlsLFxuICB0YXBcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vbmctYWRkcmVzcy1kYXRhLWdvdXYuc2VydmljZSc7XG5pbXBvcnQge0FkZHJlc3NBUElSZXN1bHR9IGZyb20gJy4vbmctYWRkcmVzcy1kYXRhLWdvdXYnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1hZGRyZXNzLWRhdGEtZ291di1zZWFyY2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIiAqbmdJZj1cImxhYmVsXCI+e3tsYWJlbH19PC9sYWJlbD5cbiAgICA8aW5wdXQgXG4gICAgICBpZD1cInt7aWR9fVwiIFxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgXG4gICAgICBbbmdTdHlsZV09XCJ7IHdpZHRoOiB3aWR0aCsncHgnIH1cIlxuICAgICAgW3ZhbHVlXT1cImlucHV0VmFsdWUgfCBhc3luY1wiXG4gICAgICAoa2V5dXApPVwib25LZXlVcCgkZXZlbnQpXCI+XG4gICAgPHVsIFtuZ1N0eWxlXT1cInsgJ3dpZHRoJzogd2lkdGgrJ3B4JywgJ2JvcmRlcic6IChsaXN0QWRkcmVzc2VzRm9yU3R5bGlzaCB8IGFzeW5jKSA/ICcwLjJweCBzb2xpZCAjY2NjJyA6ICcwcHgnIH1cIj5cbiAgICAgICA8bGkgKm5nRm9yPVwibGV0IGFkZHJlc3NMaXN0IG9mIGxpc3RBZGRyZXNzZXMgfCBhc3luYzsgbGV0IGlzT2RkID0gb2RkO1wiXG4gICAgICAgICAgIChjbGljayk9XCJzZWxlY3RBZGRyZXNzKGFkZHJlc3NMaXN0KVwiXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtY29sb3InOiBpc09kZCA/ICcjZmFmYWZhJyA6ICcjZjBmMGYwJ31cIj48c3Bhbj57e2FkZHJlc3NMaXN0LnByb3BlcnRpZXMubGFiZWx9fTwvc3Bhbj5cbiAgICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgICBpbnB1dCB7XG4gICAgICAgICAgICAgIGJvcmRlcjogMC4ycHggc29saWQgI2NjYztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1bCB7XG4gICAgICAgICAgICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbi1ibG9jay1zdGFydDogMGVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpIHtcbiAgICAgICAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGk6aG92ZXIge1xuICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgICAgICAgICB9XG4gICAgYCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2VydmljZVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZGRyZXNzU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvLyBkYXRhIHN0b3JlIGNvbnRhaW5lcnNcbiAgcHJvdGVjdGVkIHNlbGVjdGVkQWRkcmVzcyQ6IEJlaGF2aW9yU3ViamVjdDxBZGRyZXNzQVBJUmVzdWx0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30gYXMgQWRkcmVzc0FQSVJlc3VsdCk7XG4gIHByb3RlY3RlZCBsaXN0QWRkcmVzc2VzJDogU3ViamVjdDxBZGRyZXNzQVBJUmVzdWx0W10+ID0gbmV3IFN1YmplY3QoKSBhcyBTdWJqZWN0PEFkZHJlc3NBUElSZXN1bHRbXT47XG4gIGxpc3RBZGRyZXNzZXM6IE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdFtdPiA9IHRoaXMubGlzdEFkZHJlc3NlcyQuYXNPYnNlcnZhYmxlKCk7XG4gIGxpc3RBZGRyZXNzZXNGb3JTdHlsaXNoOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4gPSB0aGlzLmxpc3RBZGRyZXNzZXNcbiAgICAucGlwZShcbiAgICAgIC8vIHByZXZlbnQgdGhlIGJvcmRlciBzdHlsZSB0byBiZSBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBpcyBhbiBlbWl0aW9uIG9mIGVtcHR5L251bGwvdW5kZWZpbmVkL2VtcHR5IGFycmF5XG4gICAgICBmaWx0ZXIoKGRhdGE6IEFkZHJlc3NBUElSZXN1bHRbXSkgPT4gZGF0YS5sZW5ndGggPiAwKVxuICAgICk7XG4gIHByb3RlY3RlZCBpbnB1dFZhbHVlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoXCJcIik7XG5cbiAgLy8gY29tcG9uZW50cyBBUElcbiAgQElucHV0KCkgbG9hZGVyU2l6ZSA9IDE1O1xuICBASW5wdXQoKSB3aWR0aCA9IDI1MDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcbiAgQElucHV0KCkgbGFiZWwgPSAnJztcbiAgQElucHV0KCkgaWQgPSAncmktYWRkcmVzcy1zZWFyY2gtY29tcG9uZW50LScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICBASW5wdXQoKSB1cmk6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgaXNMb2FkaW5nOiBSZXBsYXlTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFJlcGxheVN1YmplY3QoMSk7XG4gIEBPdXRwdXQoKSBhZGRyZXNzRm91bmQ6IE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdD4gPSB0aGlzLnNlbGVjdGVkQWRkcmVzcyQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLy8gTWVtb3J5IGxlYWsgcHJldmVudGlvblxuICBwcm90ZWN0ZWQgbmdVbnN1YnNjcmliZTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNlcnZpY2U6IFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXJpKSB7XG4gICAgICB0aGlzLnNlcnZpY2UudXJpID0gdGhpcy51cmk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSk7XG5cbiAgICB0aGlzLmlucHV0VmFsdWUuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpXG4gICAgKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB0aGlzLmlzTG9hZGluZy5uZXh0KHRydWUpXG4gICAgKTtcblxuICAgIHRoaXMuaW5wdXRWYWx1ZS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlLnRyaW0oKS5sZW5ndGggPiAzLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAhdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllc1xuICAgICAgICB8fCB2YWx1ZSAhPT0gdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllcy5sYWJlbClcbiAgICAgICksXG4gICAgICBkZWJvdW5jZVRpbWUoMTAwMCksXG4gICAgICBzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4gdGhpcy5zZXJ2aWNlLnNlYXJjaChkYXRhKSlcbiAgICApLnN1YnNjcmliZSgoZGF0YTogQWRkcmVzc0FQSVJlc3VsdFtdKSA9PiB7XG4gICAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoZGF0YSk7XG4gICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsZWFuIG1lbW9yeVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUubmV4dCgpO1xuICAgIHRoaXMubmdVbnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25LZXlVcChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IChldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5pbnB1dFZhbHVlLmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvLyBAdG9kbyA6IGlzIHRoZXJlIGEgd2F5IHRvIGNvZGUgdGhvcyAzIGxpbmVzIGluIGEgd2F5IHdoZXJlIG9yZGVyIGlzIG5vdCBpbXBvcnRhbnQgPyBoZXJlIGlmIGkgbW92ZSB0aGVcbiAgLy8gaW5wdXRWYWx1ZS5uZXh0IHRoZW4gaXQgY2FuIGNhbGwgYWdhaW4gdGhlIEFwaVxuICBzZWxlY3RBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3NBUElSZXN1bHQpIHtcbiAgICAvLyBzYXZlIHRoZSBzZWxlY3RlZCBhZGRyZXNzXG4gICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MkLm5leHQoYWRkcmVzcyk7XG4gICAgLy8gY2xlYXIgdGhlIGxpc3RcbiAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoW10pO1xuICAgIC8vIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXRcbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dChhZGRyZXNzLnByb3BlcnRpZXMubGFiZWwpO1xuICB9XG59XG4iXX0=