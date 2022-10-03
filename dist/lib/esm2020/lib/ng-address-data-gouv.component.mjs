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
        this.addressFound = this.selectedAddress$.asObservable().pipe(filter((value) => value && typeof value === 'object' && value.type !== 'undefined'));
        // Memory leak prevention
        this.ngUnsubscribe = new Subject();
    }
    ngOnInit() {
        if (this.uri) {
            this.service.uri = this.uri;
        }
        this.isLoading.next(false);
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe), debounceTime(250), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label)).subscribe(() => this.isLoading.next(true));
        this.inputValue.asObservable().pipe(takeUntil(this.ngUnsubscribe), debounceTime(750), filter((value) => value.trim().length > 3), filter((value) => !this.selectedAddress$.getValue().properties
            || value !== this.selectedAddress$.getValue().properties.label), switchMap((data) => this.service.search(data))).subscribe((data) => {
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
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-margin-before:0em;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }] });
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
                    ], styles: ["input{border:.2px solid #ccc}ul{-webkit-padding-start:0px;padding-inline-start:0px;-webkit-margin-before:0em;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvbmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUNMLGVBQWUsRUFDZixZQUFZLEVBRVosTUFBTSxFQUlOLGFBQWEsRUFDYixPQUFPLEVBQ1AsU0FBUyxFQUNULFNBQVMsRUFFVixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQTZDdkQsTUFBTSxPQUFPLHNCQUFzQjtJQTJCakMsWUFBc0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQTFCdEMsd0JBQXdCO1FBQ2QscUJBQWdCLEdBQXNDLElBQUksZUFBZSxDQUFDLEVBQXNCLENBQUMsQ0FBQztRQUNsRyxtQkFBYyxHQUFnQyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUNyRyxrQkFBYSxHQUFtQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25GLDRCQUF1QixHQUFtQyxJQUFJLENBQUMsYUFBYTthQUN6RSxJQUFJO1FBQ0gsd0dBQXdHO1FBQ3hHLE1BQU0sQ0FBQyxDQUFDLElBQXdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3RELENBQUM7UUFDTSxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLGlCQUFpQjtRQUNSLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUNaLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBRyxF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LEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQseUdBQXlHO0lBQ3pHLGlEQUFpRDtJQUNqRCxhQUFhLENBQUMsT0FBeUI7UUFDckMsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7O21IQXZGVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixpUEFKdEI7UUFDVCxPQUFPO0tBQ1IsMEJBdENTOzs7Ozs7Ozs7Ozs7OztHQWNUOzJGQTBCVSxzQkFBc0I7a0JBMUNsQyxTQUFTOytCQUNFLDZCQUE2QixZQUM3Qjs7Ozs7Ozs7Ozs7Ozs7R0FjVCxhQXNCVTt3QkFDVCxPQUFPO3FCQUNSOzhGQWVRLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0ksU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdCxcbiAgZmlsdGVyLFxuICBmcm9tRXZlbnQsXG4gIG1hcCxcbiAgT2JzZXJ2YWJsZSxcbiAgUmVwbGF5U3ViamVjdCxcbiAgU3ViamVjdCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlVW50aWwsXG4gIHRhcFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9uZy1hZGRyZXNzLWRhdGEtZ291di5zZXJ2aWNlJztcbmltcG9ydCB7QWRkcmVzc0FQSVJlc3VsdH0gZnJvbSAnLi9uZy1hZGRyZXNzLWRhdGEtZ291dic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWFkZHJlc3MtZGF0YS1nb3V2LXNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiICpuZ0lmPVwibGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPlxuICAgIDxpbnB1dCBcbiAgICAgIGlkPVwie3tpZH19XCIgXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBcbiAgICAgIFtuZ1N0eWxlXT1cInsgd2lkdGg6IHdpZHRoKydweCcgfVwiXG4gICAgICBbdmFsdWVdPVwiaW5wdXRWYWx1ZSB8IGFzeW5jXCJcbiAgICAgIChrZXl1cCk9XCJvbktleVVwKCRldmVudClcIj5cbiAgICA8dWwgW25nU3R5bGVdPVwieyAnd2lkdGgnOiB3aWR0aCsncHgnLCAnYm9yZGVyJzogKGxpc3RBZGRyZXNzZXNGb3JTdHlsaXNoIHwgYXN5bmMpID8gJzAuMnB4IHNvbGlkICNjY2MnIDogJzBweCcgfVwiPlxuICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYWRkcmVzc0xpc3Qgb2YgbGlzdEFkZHJlc3NlcyB8IGFzeW5jOyBsZXQgaXNPZGQgPSBvZGQ7XCJcbiAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFkZHJlc3MoYWRkcmVzc0xpc3QpXCJcbiAgICAgICAgICAgW25nU3R5bGVdPVwieyAnYmFja2dyb3VuZC1jb2xvcic6IGlzT2RkID8gJyNmYWZhZmEnIDogJyNmMGYwZjAnfVwiPjxzcGFuPnt7YWRkcmVzc0xpc3QucHJvcGVydGllcy5sYWJlbH19PC9zcGFuPlxuICAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgICAgIGlucHV0IHtcbiAgICAgICAgICAgICAgYm9yZGVyOiAwLjJweCBzb2xpZCAjY2NjO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHVsIHtcbiAgICAgICAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICAgICAgICAgICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGkge1xuICAgICAgICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaTpob3ZlciB7XG4gICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgICAgICAgIH1cbiAgICBgLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBTZXJ2aWNlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkZHJlc3NTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIGRhdGEgc3RvcmUgY29udGFpbmVyc1xuICBwcm90ZWN0ZWQgc2VsZWN0ZWRBZGRyZXNzJDogQmVoYXZpb3JTdWJqZWN0PEFkZHJlc3NBUElSZXN1bHQ+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSBhcyBBZGRyZXNzQVBJUmVzdWx0KTtcbiAgcHJvdGVjdGVkIGxpc3RBZGRyZXNzZXMkOiBTdWJqZWN0PEFkZHJlc3NBUElSZXN1bHRbXT4gPSBuZXcgU3ViamVjdCgpIGFzIFN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdFtdPjtcbiAgbGlzdEFkZHJlc3NlczogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+ID0gdGhpcy5saXN0QWRkcmVzc2VzJC5hc09ic2VydmFibGUoKTtcbiAgbGlzdEFkZHJlc3Nlc0ZvclN0eWxpc2g6IE9ic2VydmFibGU8QWRkcmVzc0FQSVJlc3VsdFtdPiA9IHRoaXMubGlzdEFkZHJlc3Nlc1xuICAgIC5waXBlKFxuICAgICAgLy8gcHJldmVudCB0aGUgYm9yZGVyIHN0eWxlIHRvIGJlIGRpc3BsYXllZCB3aGVuIHRoZXJlIGlzIGFuIGVtaXRpb24gb2YgZW1wdHkvbnVsbC91bmRlZmluZWQvZW1wdHkgYXJyYXlcbiAgICAgIGZpbHRlcigoZGF0YTogQWRkcmVzc0FQSVJlc3VsdFtdKSA9PiBkYXRhLmxlbmd0aCA+IDApXG4gICAgKTtcbiAgcHJvdGVjdGVkIGlucHV0VmFsdWU6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChcIlwiKTtcblxuICAvLyBjb21wb25lbnRzIEFQSVxuICBASW5wdXQoKSBsb2FkZXJTaXplID0gMTU7XG4gIEBJbnB1dCgpIHdpZHRoID0gMjUwO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xuICBASW5wdXQoKSBpZCA9ICdyaS1hZGRyZXNzLXNlYXJjaC1jb21wb25lbnQtJyArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gIEBJbnB1dCgpIHVyaTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBpc0xvYWRpbmc6IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgQE91dHB1dCgpIGFkZHJlc3NGb3VuZDogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0PiA9IHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgIGZpbHRlcigodmFsdWU6IGFueSkgPT4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS50eXBlICE9PSAndW5kZWZpbmVkJylcbiAgKTtcblxuICAvLyBNZW1vcnkgbGVhayBwcmV2ZW50aW9uXG4gIHByb3RlY3RlZCBuZ1Vuc3Vic2NyaWJlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VydmljZTogU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51cmkpIHtcbiAgICAgIHRoaXMuc2VydmljZS51cmkgPSB0aGlzLnVyaTtcbiAgICB9XG5cbiAgICB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKTtcblxuICAgIHRoaXMuaW5wdXRWYWx1ZS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSksXG4gICAgICBkZWJvdW5jZVRpbWUoMjUwKSxcbiAgICAgIGZpbHRlcigodmFsdWU6IHN0cmluZykgPT4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDMpLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAhdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllc1xuICAgICAgICB8fCB2YWx1ZSAhPT0gdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllcy5sYWJlbFxuICAgICAgKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICgpID0+IHRoaXMuaXNMb2FkaW5nLm5leHQodHJ1ZSlcbiAgICApO1xuXG4gICAgdGhpcy5pbnB1dFZhbHVlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKSxcbiAgICAgIGRlYm91bmNlVGltZSg3NTApLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMyksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICF0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzXG4gICAgICAgIHx8IHZhbHVlICE9PSB0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzLmxhYmVsXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHRoaXMuc2VydmljZS5zZWFyY2goZGF0YSkpXG4gICAgKS5zdWJzY3JpYmUoKGRhdGE6IEFkZHJlc3NBUElSZXN1bHRbXSkgPT4ge1xuICAgICAgdGhpcy5saXN0QWRkcmVzc2VzJC5uZXh0KGRhdGEpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBjbGVhbiBtZW1vcnlcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5uZ1Vuc3Vic2NyaWJlLm5leHQoKTtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uS2V5VXAoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuaW5wdXRWYWx1ZS5nZXRWYWx1ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dFZhbHVlLm5leHQodmFsdWUpO1xuICB9XG5cbiAgLy8gQHRvZG8gOiBpcyB0aGVyZSBhIHdheSB0byBjb2RlIHRob3MgMyBsaW5lcyBpbiBhIHdheSB3aGVyZSBvcmRlciBpcyBub3QgaW1wb3J0YW50ID8gaGVyZSBpZiBpIG1vdmUgdGhlXG4gIC8vIGlucHV0VmFsdWUubmV4dCB0aGVuIGl0IGNhbiBjYWxsIGFnYWluIHRoZSBBcGlcbiAgc2VsZWN0QWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzQVBJUmVzdWx0KSB7XG4gICAgLy8gc2F2ZSB0aGUgc2VsZWN0ZWQgYWRkcmVzc1xuICAgIHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5uZXh0KGFkZHJlc3MpO1xuICAgIC8vIGNsZWFyIHRoZSBsaXN0XG4gICAgdGhpcy5saXN0QWRkcmVzc2VzJC5uZXh0KFtdKTtcbiAgICAvLyBjaGFuZ2UgdmFsdWUgb2YgdGhlIGlucHV0XG4gICAgdGhpcy5pbnB1dFZhbHVlLm5leHQoYWRkcmVzcy5wcm9wZXJ0aWVzLmxhYmVsKTtcbiAgfVxufVxuIl19