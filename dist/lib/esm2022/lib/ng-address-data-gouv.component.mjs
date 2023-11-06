import { Component, Input, Output, inject } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Service } from './ng-address-data-gouv.service';
import { AsyncPipe, CommonModule, NgFor, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class AddressSearchComponent {
    constructor() {
        this.service = inject(Service);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: AddressSearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: AddressSearchComponent, isStandalone: true, selector: "ng-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
            HttpClient,
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
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: NgFor, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: HttpClientModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, imports: [NgStyle, NgFor, AsyncPipe, CommonModule, HttpClientModule,], selector: 'ng-address-data-gouv-search', template: `
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
                        HttpClient,
                        Service
                    ], styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"] }]
        }], propDecorators: { loaderSize: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvbmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFDTCxlQUFlLEVBQ2YsWUFBWSxFQUVaLE1BQU0sRUFJTixhQUFhLEVBQ2IsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBRVYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBK0NwRSxNQUFNLE9BQU8sc0JBQXNCO0lBN0NuQztRQThDWSxZQUFPLEdBQVksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdDLHdCQUF3QjtRQUNkLHFCQUFnQixHQUFzQyxJQUFJLGVBQWUsQ0FBQyxFQUFzQixDQUFDLENBQUM7UUFDbEcsbUJBQWMsR0FBZ0MsSUFBSSxPQUFPLEVBQWlDLENBQUM7UUFDckcsa0JBQWEsR0FBbUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRiw0QkFBdUIsR0FBbUMsSUFBSSxDQUFDLGFBQWE7YUFDekUsSUFBSTtRQUNILHdHQUF3RztRQUN4RyxNQUFNLENBQUMsQ0FBQyxJQUF3QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUN0RCxDQUFDO1FBQ00sZUFBVSxHQUE0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QkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csRUFBRTtzQkFBVixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDSSxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGRlYm91bmNlVGltZSxcbiAgZGlzdGluY3QsXG4gIGZpbHRlcixcbiAgZnJvbUV2ZW50LFxuICBtYXAsXG4gIE9ic2VydmFibGUsXG4gIFJlcGxheVN1YmplY3QsXG4gIFN1YmplY3QsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZVVudGlsLFxuICB0YXBcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vbmctYWRkcmVzcy1kYXRhLWdvdXYuc2VydmljZSc7XG5pbXBvcnQge0FkZHJlc3NBUElSZXN1bHR9IGZyb20gJy4vbmctYWRkcmVzcy1kYXRhLWdvdXYnO1xuaW1wb3J0IHsgQXN5bmNQaXBlLCBDb21tb25Nb2R1bGUsIE5nRm9yLCBOZ1N0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBDb21wb25lbnQoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdTdHlsZSwgTmdGb3IsIEFzeW5jUGlwZSwgQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlLCBdLFxuICBzZWxlY3RvcjogJ25nLWFkZHJlc3MtZGF0YS1nb3V2LXNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIGZvcj1cInt7aWR9fVwiICpuZ0lmPVwibGFiZWxcIj57e2xhYmVsfX08L2xhYmVsPlxuICAgIDxpbnB1dCBcbiAgICAgIGlkPVwie3tpZH19XCIgXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBcbiAgICAgIFtuZ1N0eWxlXT1cInsgd2lkdGg6IHdpZHRoKydweCcgfVwiXG4gICAgICBbdmFsdWVdPVwiaW5wdXRWYWx1ZSB8IGFzeW5jXCJcbiAgICAgIChrZXl1cCk9XCJvbktleVVwKCRldmVudClcIj5cbiAgICA8dWwgW25nU3R5bGVdPVwieyAnd2lkdGgnOiB3aWR0aCsncHgnLCAnYm9yZGVyJzogKGxpc3RBZGRyZXNzZXNGb3JTdHlsaXNoIHwgYXN5bmMpID8gJzAuMnB4IHNvbGlkICNjY2MnIDogJzBweCcgfVwiPlxuICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYWRkcmVzc0xpc3Qgb2YgbGlzdEFkZHJlc3NlcyB8IGFzeW5jOyBsZXQgaXNPZGQgPSBvZGQ7XCJcbiAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFkZHJlc3MoYWRkcmVzc0xpc3QpXCJcbiAgICAgICAgICAgW25nU3R5bGVdPVwieyAnYmFja2dyb3VuZC1jb2xvcic6IGlzT2RkID8gJyNmYWZhZmEnIDogJyNmMGYwZjAnfVwiPjxzcGFuPnt7YWRkcmVzc0xpc3QucHJvcGVydGllcy5sYWJlbH19PC9zcGFuPlxuICAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIGlucHV0IHtcbiAgICAgICAgYm9yZGVyOiAwLjJweCBzb2xpZCAjY2NjO1xuICAgIH1cblxuICAgIHVsIHtcbiAgICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICAgICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwZW07XG4gICAgfVxuXG4gICAgbGkge1xuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG5cbiAgICBsaTpob3ZlciB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xuICAgIH1cbiAgICBgLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBIdHRwQ2xpZW50LFxuICAgIFNlcnZpY2VcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc1NlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHNlcnZpY2U6IFNlcnZpY2UgPSBpbmplY3QoU2VydmljZSk7XG5cbiAgLy8gZGF0YSBzdG9yZSBjb250YWluZXJzXG4gIHByb3RlY3RlZCBzZWxlY3RlZEFkZHJlc3MkOiBCZWhhdmlvclN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9IGFzIEFkZHJlc3NBUElSZXN1bHQpO1xuICBwcm90ZWN0ZWQgbGlzdEFkZHJlc3NlcyQ6IFN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdFtdPiA9IG5ldyBTdWJqZWN0KCkgYXMgU3ViamVjdDxBZGRyZXNzQVBJUmVzdWx0W10+O1xuICBsaXN0QWRkcmVzc2VzOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4gPSB0aGlzLmxpc3RBZGRyZXNzZXMkLmFzT2JzZXJ2YWJsZSgpO1xuICBsaXN0QWRkcmVzc2VzRm9yU3R5bGlzaDogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+ID0gdGhpcy5saXN0QWRkcmVzc2VzXG4gICAgLnBpcGUoXG4gICAgICAvLyBwcmV2ZW50IHRoZSBib3JkZXIgc3R5bGUgdG8gYmUgZGlzcGxheWVkIHdoZW4gdGhlcmUgaXMgYW4gZW1pdGlvbiBvZiBlbXB0eS9udWxsL3VuZGVmaW5lZC9lbXB0eSBhcnJheVxuICAgICAgZmlsdGVyKChkYXRhOiBBZGRyZXNzQVBJUmVzdWx0W10pID0+IGRhdGEubGVuZ3RoID4gMClcbiAgICApO1xuICBwcm90ZWN0ZWQgaW5wdXRWYWx1ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFwiXCIpO1xuXG4gIC8vIGNvbXBvbmVudHMgQVBJXG4gIEBJbnB1dCgpIGxvYWRlclNpemUgPSAxNTtcbiAgQElucHV0KCkgd2lkdGggPSAyNTA7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIGlkID0gJ3JpLWFkZHJlc3Mtc2VhcmNoLWNvbXBvbmVudC0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgQElucHV0KCkgdXJpOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIGlzTG9hZGluZzogUmVwbGF5U3ViamVjdDxib29sZWFuPiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuICBAT3V0cHV0KCkgYWRkcmVzc0ZvdW5kOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHQ+ID0gdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgZmlsdGVyKCh2YWx1ZTogYW55KSA9PiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnR5cGUgIT09ICd1bmRlZmluZWQnKVxuICApO1xuXG4gIC8vIE1lbW9yeSBsZWFrIHByZXZlbnRpb25cbiAgcHJvdGVjdGVkIG5nVW5zdWJzY3JpYmU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVyaSkge1xuICAgICAgdGhpcy5zZXJ2aWNlLnVyaSA9IHRoaXMudXJpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2FkaW5nLm5leHQoZmFsc2UpO1xuXG4gICAgdGhpcy5pbnB1dFZhbHVlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKSxcbiAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMyksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICF0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzXG4gICAgICAgIHx8IHZhbHVlICE9PSB0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzLmxhYmVsXG4gICAgICApLFxuICAgICkuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4gdGhpcy5pc0xvYWRpbmcubmV4dCh0cnVlKVxuICAgICk7XG5cbiAgICB0aGlzLmlucHV0VmFsdWUuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpLFxuICAgICAgZGVib3VuY2VUaW1lKDc1MCksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlLnRyaW0oKS5sZW5ndGggPiAzKSxcbiAgICAgIGZpbHRlcigodmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgIXRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5nZXRWYWx1ZSgpLnByb3BlcnRpZXNcbiAgICAgICAgfHwgdmFsdWUgIT09IHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5nZXRWYWx1ZSgpLnByb3BlcnRpZXMubGFiZWxcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4gdGhpcy5zZXJ2aWNlLnNlYXJjaChkYXRhKSlcbiAgICApLnN1YnNjcmliZSgoZGF0YTogQWRkcmVzc0FQSVJlc3VsdFtdKSA9PiB7XG4gICAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoZGF0YSk7XG4gICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsZWFuIG1lbW9yeVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUubmV4dCgpO1xuICAgIHRoaXMubmdVbnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25LZXlVcChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IChldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5pbnB1dFZhbHVlLmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvLyBAdG9kbyA6IGlzIHRoZXJlIGEgd2F5IHRvIGNvZGUgdGhvcyAzIGxpbmVzIGluIGEgd2F5IHdoZXJlIG9yZGVyIGlzIG5vdCBpbXBvcnRhbnQgPyBoZXJlIGlmIGkgbW92ZSB0aGVcbiAgLy8gaW5wdXRWYWx1ZS5uZXh0IHRoZW4gaXQgY2FuIGNhbGwgYWdhaW4gdGhlIEFwaVxuICBzZWxlY3RBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3NBUElSZXN1bHQpIHtcbiAgICAvLyBzYXZlIHRoZSBzZWxlY3RlZCBhZGRyZXNzXG4gICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MkLm5leHQoYWRkcmVzcyk7XG4gICAgLy8gY2xlYXIgdGhlIGxpc3RcbiAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoW10pO1xuICAgIC8vIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXRcbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dChhZGRyZXNzLnByb3BlcnRpZXMubGFiZWwpO1xuICB9XG59XG4iXX0=