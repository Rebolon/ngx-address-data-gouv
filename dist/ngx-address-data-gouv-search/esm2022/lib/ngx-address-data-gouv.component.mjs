import { Component, Input, Output, inject } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Service } from './ngx-address-data-gouv.service';
import { AsyncPipe, CommonModule, NgFor, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
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
        this.id = 'ngx-address-search-component-' + (new Date()).getTime();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.2", ngImport: i0, type: AddressSearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.3.2", type: AddressSearchComponent, isStandalone: true, selector: "ngx-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
            HttpClient,
            Service
        ], ngImport: i0, template: `
  @if (id) {
    <label for="{{id}}">{{label}}</label>
  }
    <input
      id="{{id}}"
      [placeholder]="placeholder"
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
       <li (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
      }
    </ul>
  `, isInline: true, styles: ["input{border:.2px solid #ccc}ul{padding-inline-start:0px;margin-block-start:0em}li{list-style-type:none;cursor:pointer}li:hover{padding-left:5px}\n"], dependencies: [{ kind: "directive", type: NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: AsyncPipe, name: "async" }, { kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: HttpClientModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.2", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, imports: [NgStyle, NgFor, AsyncPipe, CommonModule, HttpClientModule,], selector: 'ngx-address-data-gouv-search', template: `
  @if (id) {
    <label for="{{id}}">{{label}}</label>
  }
    <input
      id="{{id}}"
      [placeholder]="placeholder"
      [ngStyle]="{ width: width+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)">
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
       <li (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtZGF0YS1nb3V2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hZGRyZXNzLWRhdGEtZ291di1zZWFyY2gvc3JjL2xpYi9uZ3gtYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFDTCxlQUFlLEVBQ2YsWUFBWSxFQUVaLE1BQU0sRUFJTixhQUFhLEVBQ2IsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBRVYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFrRHBFLE1BQU0sT0FBTyxzQkFBc0I7SUFoRG5DO1FBaURZLFlBQU8sR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0Msd0JBQXdCO1FBQ2QscUJBQWdCLEdBQXNDLElBQUksZUFBZSxDQUFDLEVBQXNCLENBQUMsQ0FBQztRQUNsRyxtQkFBYyxHQUFnQyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUNyRyxrQkFBYSxHQUFtQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25GLDRCQUF1QixHQUFtQyxJQUFJLENBQUMsYUFBYTthQUN6RSxJQUFJO1FBQ0gsd0dBQXdHO1FBQ3hHLE1BQU0sQ0FBQyxDQUFDLElBQXdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFD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c0JBQWIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdCxcbiAgZmlsdGVyLFxuICBmcm9tRXZlbnQsXG4gIG1hcCxcbiAgT2JzZXJ2YWJsZSxcbiAgUmVwbGF5U3ViamVjdCxcbiAgU3ViamVjdCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlVW50aWwsXG4gIHRhcFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9uZ3gtYWRkcmVzcy1kYXRhLWdvdXYuc2VydmljZSc7XG5pbXBvcnQge0FkZHJlc3NBUElSZXN1bHR9IGZyb20gJy4vbmd4LWFkZHJlc3MtZGF0YS1nb3V2JztcbmltcG9ydCB7IEFzeW5jUGlwZSwgQ29tbW9uTW9kdWxlLCBOZ0ZvciwgTmdTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nU3R5bGUsIE5nRm9yLCBBc3luY1BpcGUsIENvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgXSxcbiAgc2VsZWN0b3I6ICduZ3gtYWRkcmVzcy1kYXRhLWdvdXYtc2VhcmNoJyxcbiAgdGVtcGxhdGU6IGBcbiAgQGlmIChpZCkge1xuICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIj57e2xhYmVsfX08L2xhYmVsPlxuICB9XG4gICAgPGlucHV0XG4gICAgICBpZD1cInt7aWR9fVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgW25nU3R5bGVdPVwieyB3aWR0aDogd2lkdGgrJ3B4JyB9XCJcbiAgICAgIFt2YWx1ZV09XCJpbnB1dFZhbHVlIHwgYXN5bmNcIlxuICAgICAgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50KVwiPlxuICAgIDx1bCBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IHdpZHRoKydweCcsICdib3JkZXInOiAobGlzdEFkZHJlc3Nlc0ZvclN0eWxpc2ggfCBhc3luYykgPyAnMC4ycHggc29saWQgI2NjYycgOiAnMHB4JyB9XCI+XG4gICAgICBAZm9yIChhZGRyZXNzTGlzdCBvZiBsaXN0QWRkcmVzc2VzIHwgYXN5bmM7IHRyYWNrIGFkZHJlc3NMaXN0OyBsZXQgaXNPZGQgPSAkb2RkKSB7XG4gICAgICAgPGxpIChjbGljayk9XCJzZWxlY3RBZGRyZXNzKGFkZHJlc3NMaXN0KVwiXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtY29sb3InOiBpc09kZCA/ICcjZmFmYWZhJyA6ICcjZjBmMGYwJ31cIj48c3Bhbj57e2FkZHJlc3NMaXN0LnByb3BlcnRpZXMubGFiZWx9fTwvc3Bhbj5cbiAgICAgICA8L2xpPlxuICAgICAgfVxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczpcbiAgICBgXG4gICAgaW5wdXQge1xuICAgICAgICBib3JkZXI6IDAuMnB4IHNvbGlkICNjY2M7XG4gICAgfVxuXG4gICAgdWwge1xuICAgICAgICBwYWRkaW5nLWlubGluZS1zdGFydDogMHB4O1xuICAgICAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTtcbiAgICB9XG5cbiAgICBsaSB7XG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIGxpOmhvdmVyIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gICAgfVxuICAgIGBcbiAgLFxuICBwcm92aWRlcnM6IFtcbiAgICBIdHRwQ2xpZW50LFxuICAgIFNlcnZpY2VcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc1NlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHNlcnZpY2U6IFNlcnZpY2UgPSBpbmplY3QoU2VydmljZSk7XG5cbiAgLy8gZGF0YSBzdG9yZSBjb250YWluZXJzXG4gIHByb3RlY3RlZCBzZWxlY3RlZEFkZHJlc3MkOiBCZWhhdmlvclN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9IGFzIEFkZHJlc3NBUElSZXN1bHQpO1xuICBwcm90ZWN0ZWQgbGlzdEFkZHJlc3NlcyQ6IFN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdFtdPiA9IG5ldyBTdWJqZWN0KCkgYXMgU3ViamVjdDxBZGRyZXNzQVBJUmVzdWx0W10+O1xuICBsaXN0QWRkcmVzc2VzOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4gPSB0aGlzLmxpc3RBZGRyZXNzZXMkLmFzT2JzZXJ2YWJsZSgpO1xuICBsaXN0QWRkcmVzc2VzRm9yU3R5bGlzaDogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+ID0gdGhpcy5saXN0QWRkcmVzc2VzXG4gICAgLnBpcGUoXG4gICAgICAvLyBwcmV2ZW50IHRoZSBib3JkZXIgc3R5bGUgdG8gYmUgZGlzcGxheWVkIHdoZW4gdGhlcmUgaXMgYW4gZW1pdGlvbiBvZiBlbXB0eS9udWxsL3VuZGVmaW5lZC9lbXB0eSBhcnJheVxuICAgICAgZmlsdGVyKChkYXRhOiBBZGRyZXNzQVBJUmVzdWx0W10pID0+IGRhdGEubGVuZ3RoID4gMClcbiAgICApO1xuICBwcm90ZWN0ZWQgaW5wdXRWYWx1ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFwiXCIpO1xuXG4gIC8vIGNvbXBvbmVudHMgQVBJXG4gIEBJbnB1dCgpIGxvYWRlclNpemUgPSAxNTtcbiAgQElucHV0KCkgd2lkdGggPSAyNTA7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIGlkID0gJ25neC1hZGRyZXNzLXNlYXJjaC1jb21wb25lbnQtJyArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gIEBJbnB1dCgpIHVyaTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBpc0xvYWRpbmc6IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgQE91dHB1dCgpIGFkZHJlc3NGb3VuZDogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0PiA9IHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgIGZpbHRlcigodmFsdWU6IGFueSkgPT4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS50eXBlICE9PSAndW5kZWZpbmVkJylcbiAgKTtcblxuICAvLyBNZW1vcnkgbGVhayBwcmV2ZW50aW9uXG4gIHByb3RlY3RlZCBuZ1Vuc3Vic2NyaWJlOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51cmkpIHtcbiAgICAgIHRoaXMuc2VydmljZS51cmkgPSB0aGlzLnVyaTtcbiAgICB9XG5cbiAgICB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKTtcblxuICAgIHRoaXMuaW5wdXRWYWx1ZS5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMubmdVbnN1YnNjcmliZSksXG4gICAgICBkZWJvdW5jZVRpbWUoMjUwKSxcbiAgICAgIGZpbHRlcigodmFsdWU6IHN0cmluZykgPT4gdmFsdWUudHJpbSgpLmxlbmd0aCA+IDMpLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PlxuICAgICAgICAhdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllc1xuICAgICAgICB8fCB2YWx1ZSAhPT0gdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmdldFZhbHVlKCkucHJvcGVydGllcy5sYWJlbFxuICAgICAgKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICgpID0+IHRoaXMuaXNMb2FkaW5nLm5leHQodHJ1ZSlcbiAgICApO1xuXG4gICAgdGhpcy5pbnB1dFZhbHVlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKSxcbiAgICAgIGRlYm91bmNlVGltZSg3NTApLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMyksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICF0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzXG4gICAgICAgIHx8IHZhbHVlICE9PSB0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzLmxhYmVsXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHRoaXMuc2VydmljZS5zZWFyY2goZGF0YSkpXG4gICAgKS5zdWJzY3JpYmUoKGRhdGE6IEFkZHJlc3NBUElSZXN1bHRbXSkgPT4ge1xuICAgICAgdGhpcy5saXN0QWRkcmVzc2VzJC5uZXh0KGRhdGEpO1xuICAgICAgdGhpcy5pc0xvYWRpbmcubmV4dChmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBjbGVhbiBtZW1vcnlcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5uZ1Vuc3Vic2NyaWJlLm5leHQoKTtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uS2V5VXAoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuaW5wdXRWYWx1ZS5nZXRWYWx1ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dFZhbHVlLm5leHQodmFsdWUpO1xuICB9XG5cbiAgLy8gQHRvZG8gOiBpcyB0aGVyZSBhIHdheSB0byBjb2RlIHRob3MgMyBsaW5lcyBpbiBhIHdheSB3aGVyZSBvcmRlciBpcyBub3QgaW1wb3J0YW50ID8gaGVyZSBpZiBpIG1vdmUgdGhlXG4gIC8vIGlucHV0VmFsdWUubmV4dCB0aGVuIGl0IGNhbiBjYWxsIGFnYWluIHRoZSBBcGlcbiAgc2VsZWN0QWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzQVBJUmVzdWx0KSB7XG4gICAgLy8gc2F2ZSB0aGUgc2VsZWN0ZWQgYWRkcmVzc1xuICAgIHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5uZXh0KGFkZHJlc3MpO1xuICAgIC8vIGNsZWFyIHRoZSBsaXN0XG4gICAgdGhpcy5saXN0QWRkcmVzc2VzJC5uZXh0KFtdKTtcbiAgICAvLyBjaGFuZ2UgdmFsdWUgb2YgdGhlIGlucHV0XG4gICAgdGhpcy5pbnB1dFZhbHVlLm5leHQoYWRkcmVzcy5wcm9wZXJ0aWVzLmxhYmVsKTtcbiAgfVxufVxuIl19