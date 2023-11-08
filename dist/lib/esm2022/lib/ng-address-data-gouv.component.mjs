import { Component, Input, Output, inject } from '@angular/core';
import { BehaviorSubject, debounceTime, filter, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { Service } from './ng-address-data-gouv.service';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: AddressSearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.0.1", type: AddressSearchComponent, isStandalone: true, selector: "ng-address-data-gouv-search", inputs: { loaderSize: "loaderSize", width: "width", placeholder: "placeholder", label: "label", id: "id", uri: "uri" }, outputs: { isLoading: "isLoading", addressFound: "addressFound" }, providers: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.1", ngImport: i0, type: AddressSearchComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, imports: [NgStyle, NgFor, AsyncPipe, CommonModule, HttpClientModule,], selector: 'ng-address-data-gouv-search', template: `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvbmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFDTCxlQUFlLEVBQ2YsWUFBWSxFQUVaLE1BQU0sRUFJTixhQUFhLEVBQ2IsT0FBTyxFQUNQLFNBQVMsRUFDVCxTQUFTLEVBRVYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFrRHBFLE1BQU0sT0FBTyxzQkFBc0I7SUFoRG5DO1FBaURZLFlBQU8sR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0Msd0JBQXdCO1FBQ2QscUJBQWdCLEdBQXNDLElBQUksZUFBZSxDQUFDLEVBQXNCLENBQUMsQ0FBQztRQUNsRyxtQkFBYyxHQUFnQyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUNyRyxrQkFBYSxHQUFtQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25GLDRCQUF1QixHQUFtQyxJQUFJLENBQUMsYUFBYTthQUN6RSxJQUFJO1FBQ0gsd0dBQXdHO1FBQ3hHLE1BQU0sQ0FBQyxDQUFDLElBQXdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3RELENBQUM7UUFDTSxlQUFVLEdBQTRCLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLGlCQUFpQjtRQUNSLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUNaLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxPQUFFLEdBQUcsOEJBQThCLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0QsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQTJCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELGlCQUFZLEdBQWlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzlGLE1BQU0sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUN6RixDQUFDO1FBRUYseUJBQXlCO1FBQ2Ysa0JBQWEsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztLQTZEeEQ7SUEzREMsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDN0I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFDN0IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixNQUFNLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ2xELE1BQU0sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ3ZCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVU7ZUFDekMsS0FBSyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUMvRCxDQUNGLENBQUMsU0FBUyxDQUNULEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNoQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsTUFBTSxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUNsRCxNQUFNLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUN2QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxVQUFVO2VBQ3pDLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FDL0QsRUFDRCxTQUFTLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZELENBQUMsU0FBUyxDQUFDLENBQUMsSUFBd0IsRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGVBQWU7SUFDZixXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBWTtRQUNsQixNQUFNLEtBQUssR0FBSSxLQUFLLENBQUMsYUFBa0MsQ0FBQyxLQUFLLENBQUM7UUFDOUQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQseUdBQXlHO0lBQ3pHLGlEQUFpRDtJQUNqRCxhQUFhLENBQUMsT0FBeUI7UUFDckMsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7OEdBdkZVLHNCQUFzQjtrR0FBdEIsc0JBQXNCLHFRQUx0QjtZQUNULFVBQVU7WUFDVixPQUFPO1NBQ1IsMEJBMUNTOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVCw2TkFuQlMsT0FBTyxzRUFBUyxTQUFTLDZDQUFFLFlBQVksOEJBQUUsZ0JBQWdCOzsyRkE4Q3hELHNCQUFzQjtrQkFoRGxDLFNBQVM7aUNBQ0ksSUFBSSxXQUNQLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFHLFlBQzVELDZCQUE2QixZQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQsYUFzQlU7d0JBQ1QsVUFBVTt3QkFDVixPQUFPO3FCQUNSOzhCQWlCUSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNJLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZGVib3VuY2VUaW1lLFxuICBkaXN0aW5jdCxcbiAgZmlsdGVyLFxuICBmcm9tRXZlbnQsXG4gIG1hcCxcbiAgT2JzZXJ2YWJsZSxcbiAgUmVwbGF5U3ViamVjdCxcbiAgU3ViamVjdCxcbiAgc3dpdGNoTWFwLFxuICB0YWtlVW50aWwsXG4gIHRhcFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9uZy1hZGRyZXNzLWRhdGEtZ291di5zZXJ2aWNlJztcbmltcG9ydCB7QWRkcmVzc0FQSVJlc3VsdH0gZnJvbSAnLi9uZy1hZGRyZXNzLWRhdGEtZ291dic7XG5pbXBvcnQgeyBBc3luY1BpcGUsIENvbW1vbk1vZHVsZSwgTmdGb3IsIE5nU3R5bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtOZ1N0eWxlLCBOZ0ZvciwgQXN5bmNQaXBlLCBDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUsIF0sXG4gIHNlbGVjdG9yOiAnbmctYWRkcmVzcy1kYXRhLWdvdXYtc2VhcmNoJyxcbiAgdGVtcGxhdGU6IGBcbiAgQGlmIChpZCkge1xuICAgIDxsYWJlbCBmb3I9XCJ7e2lkfX1cIj57e2xhYmVsfX08L2xhYmVsPlxuICB9XG4gICAgPGlucHV0IFxuICAgICAgaWQ9XCJ7e2lkfX1cIiBcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFxuICAgICAgW25nU3R5bGVdPVwieyB3aWR0aDogd2lkdGgrJ3B4JyB9XCJcbiAgICAgIFt2YWx1ZV09XCJpbnB1dFZhbHVlIHwgYXN5bmNcIlxuICAgICAgKGtleXVwKT1cIm9uS2V5VXAoJGV2ZW50KVwiPlxuICAgIDx1bCBbbmdTdHlsZV09XCJ7ICd3aWR0aCc6IHdpZHRoKydweCcsICdib3JkZXInOiAobGlzdEFkZHJlc3Nlc0ZvclN0eWxpc2ggfCBhc3luYykgPyAnMC4ycHggc29saWQgI2NjYycgOiAnMHB4JyB9XCI+XG4gICAgICBAZm9yIChhZGRyZXNzTGlzdCBvZiBsaXN0QWRkcmVzc2VzIHwgYXN5bmM7IHRyYWNrIGFkZHJlc3NMaXN0OyBsZXQgaXNPZGQgPSAkb2RkKSB7XG4gICAgICAgPGxpIChjbGljayk9XCJzZWxlY3RBZGRyZXNzKGFkZHJlc3NMaXN0KVwiXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtY29sb3InOiBpc09kZCA/ICcjZmFmYWZhJyA6ICcjZjBmMGYwJ31cIj48c3Bhbj57e2FkZHJlc3NMaXN0LnByb3BlcnRpZXMubGFiZWx9fTwvc3Bhbj5cbiAgICAgICA8L2xpPlxuICAgICAgfVxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczpcbiAgICBgXG4gICAgaW5wdXQge1xuICAgICAgICBib3JkZXI6IDAuMnB4IHNvbGlkICNjY2M7XG4gICAgfVxuXG4gICAgdWwge1xuICAgICAgICBwYWRkaW5nLWlubGluZS1zdGFydDogMHB4O1xuICAgICAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTtcbiAgICB9XG5cbiAgICBsaSB7XG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cblxuICAgIGxpOmhvdmVyIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gICAgfVxuICAgIGBcbiAgLFxuICBwcm92aWRlcnM6IFtcbiAgICBIdHRwQ2xpZW50LFxuICAgIFNlcnZpY2VcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWRkcmVzc1NlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHNlcnZpY2U6IFNlcnZpY2UgPSBpbmplY3QoU2VydmljZSk7XG5cbiAgLy8gZGF0YSBzdG9yZSBjb250YWluZXJzXG4gIHByb3RlY3RlZCBzZWxlY3RlZEFkZHJlc3MkOiBCZWhhdmlvclN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9IGFzIEFkZHJlc3NBUElSZXN1bHQpO1xuICBwcm90ZWN0ZWQgbGlzdEFkZHJlc3NlcyQ6IFN1YmplY3Q8QWRkcmVzc0FQSVJlc3VsdFtdPiA9IG5ldyBTdWJqZWN0KCkgYXMgU3ViamVjdDxBZGRyZXNzQVBJUmVzdWx0W10+O1xuICBsaXN0QWRkcmVzc2VzOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHRbXT4gPSB0aGlzLmxpc3RBZGRyZXNzZXMkLmFzT2JzZXJ2YWJsZSgpO1xuICBsaXN0QWRkcmVzc2VzRm9yU3R5bGlzaDogT2JzZXJ2YWJsZTxBZGRyZXNzQVBJUmVzdWx0W10+ID0gdGhpcy5saXN0QWRkcmVzc2VzXG4gICAgLnBpcGUoXG4gICAgICAvLyBwcmV2ZW50IHRoZSBib3JkZXIgc3R5bGUgdG8gYmUgZGlzcGxheWVkIHdoZW4gdGhlcmUgaXMgYW4gZW1pdGlvbiBvZiBlbXB0eS9udWxsL3VuZGVmaW5lZC9lbXB0eSBhcnJheVxuICAgICAgZmlsdGVyKChkYXRhOiBBZGRyZXNzQVBJUmVzdWx0W10pID0+IGRhdGEubGVuZ3RoID4gMClcbiAgICApO1xuICBwcm90ZWN0ZWQgaW5wdXRWYWx1ZTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFwiXCIpO1xuXG4gIC8vIGNvbXBvbmVudHMgQVBJXG4gIEBJbnB1dCgpIGxvYWRlclNpemUgPSAxNTtcbiAgQElucHV0KCkgd2lkdGggPSAyNTA7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIGlkID0gJ3JpLWFkZHJlc3Mtc2VhcmNoLWNvbXBvbmVudC0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgQElucHV0KCkgdXJpOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgpIGlzTG9hZGluZzogUmVwbGF5U3ViamVjdDxib29sZWFuPiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEpO1xuICBAT3V0cHV0KCkgYWRkcmVzc0ZvdW5kOiBPYnNlcnZhYmxlPEFkZHJlc3NBUElSZXN1bHQ+ID0gdGhpcy5zZWxlY3RlZEFkZHJlc3MkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgZmlsdGVyKCh2YWx1ZTogYW55KSA9PiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnR5cGUgIT09ICd1bmRlZmluZWQnKVxuICApO1xuXG4gIC8vIE1lbW9yeSBsZWFrIHByZXZlbnRpb25cbiAgcHJvdGVjdGVkIG5nVW5zdWJzY3JpYmU6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVyaSkge1xuICAgICAgdGhpcy5zZXJ2aWNlLnVyaSA9IHRoaXMudXJpO1xuICAgIH1cblxuICAgIHRoaXMuaXNMb2FkaW5nLm5leHQoZmFsc2UpO1xuXG4gICAgdGhpcy5pbnB1dFZhbHVlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ1Vuc3Vic2NyaWJlKSxcbiAgICAgIGRlYm91bmNlVGltZSgyNTApLFxuICAgICAgZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMyksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+XG4gICAgICAgICF0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzXG4gICAgICAgIHx8IHZhbHVlICE9PSB0aGlzLnNlbGVjdGVkQWRkcmVzcyQuZ2V0VmFsdWUoKS5wcm9wZXJ0aWVzLmxhYmVsXG4gICAgICApLFxuICAgICkuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4gdGhpcy5pc0xvYWRpbmcubmV4dCh0cnVlKVxuICAgICk7XG5cbiAgICB0aGlzLmlucHV0VmFsdWUuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLm5nVW5zdWJzY3JpYmUpLFxuICAgICAgZGVib3VuY2VUaW1lKDc1MCksXG4gICAgICBmaWx0ZXIoKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlLnRyaW0oKS5sZW5ndGggPiAzKSxcbiAgICAgIGZpbHRlcigodmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgIXRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5nZXRWYWx1ZSgpLnByb3BlcnRpZXNcbiAgICAgICAgfHwgdmFsdWUgIT09IHRoaXMuc2VsZWN0ZWRBZGRyZXNzJC5nZXRWYWx1ZSgpLnByb3BlcnRpZXMubGFiZWxcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4gdGhpcy5zZXJ2aWNlLnNlYXJjaChkYXRhKSlcbiAgICApLnN1YnNjcmliZSgoZGF0YTogQWRkcmVzc0FQSVJlc3VsdFtdKSA9PiB7XG4gICAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoZGF0YSk7XG4gICAgICB0aGlzLmlzTG9hZGluZy5uZXh0KGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGNsZWFuIG1lbW9yeVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm5nVW5zdWJzY3JpYmUubmV4dCgpO1xuICAgIHRoaXMubmdVbnN1YnNjcmliZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25LZXlVcChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IChldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5pbnB1dFZhbHVlLmdldFZhbHVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvLyBAdG9kbyA6IGlzIHRoZXJlIGEgd2F5IHRvIGNvZGUgdGhvcyAzIGxpbmVzIGluIGEgd2F5IHdoZXJlIG9yZGVyIGlzIG5vdCBpbXBvcnRhbnQgPyBoZXJlIGlmIGkgbW92ZSB0aGVcbiAgLy8gaW5wdXRWYWx1ZS5uZXh0IHRoZW4gaXQgY2FuIGNhbGwgYWdhaW4gdGhlIEFwaVxuICBzZWxlY3RBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3NBUElSZXN1bHQpIHtcbiAgICAvLyBzYXZlIHRoZSBzZWxlY3RlZCBhZGRyZXNzXG4gICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MkLm5leHQoYWRkcmVzcyk7XG4gICAgLy8gY2xlYXIgdGhlIGxpc3RcbiAgICB0aGlzLmxpc3RBZGRyZXNzZXMkLm5leHQoW10pO1xuICAgIC8vIGNoYW5nZSB2YWx1ZSBvZiB0aGUgaW5wdXRcbiAgICB0aGlzLmlucHV0VmFsdWUubmV4dChhZGRyZXNzLnByb3BlcnRpZXMubGFiZWwpO1xuICB9XG59XG4iXX0=