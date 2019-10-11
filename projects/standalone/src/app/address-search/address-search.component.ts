import {
  AfterViewInit,
  Component, ElementRef,
  Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {fromEvent, Observable, ReplaySubject, Subject} from 'rxjs';
import {AddressAPIResult, Service} from '../services/address-search.service';
import {debounceTime, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search-address',
  template: `
    <label for="{{id}}" *ngIf="label">{{label}}</label>
    <input id="{{id}}" [placeholder]="placeholder" [ngStyle]="{ 'width': width+'px' }" #elSearchAddress>
    <app-loader [position]="width" [size]="loaderSize" [isLoading]="isLoading | async"></app-loader>
    <ul [ngStyle]="{ 'width': width+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
       <li *ngFor="let addressList of listAddresses | async; let isOdd = odd;"
           (click)="selectAddress(addressList)"
           [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}"><span>{{addressList.properties.label}}</span>
       </li>
    </ul>
  `,
  styles: [
    `
          input {
              border: 0.2px solid #ccc;
          }

          ul {
              padding-inline-start: 0px;
              margin-block-start: 0em;
          }

          li {
              list-style-type: none;
              cursor: pointer;
          }

          li:hover {
              padding-left: 5px;
          }
    `,
  ],
  providers: [
    Service
  ],
})
export class AddressSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() loaderSize = 15;
  @Input() width = 250;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() id = 'ri-address-search-component-' + (new Date()).getTime();
  @Input() uri;

  // data store containers
  protected selectedAddress$: ReplaySubject<AddressAPIResult> = new ReplaySubject(1);
  protected listAddresses$: Subject<AddressAPIResult[]> = new Subject() as Subject<AddressAPIResult[]>;
  listAddresses: Observable<AddressAPIResult[]> = this.listAddresses$.asObservable();
  listAddressesForStylish: Observable<AddressAPIResult[]> = this.listAddresses
    .pipe(
      // prevent the border style to be displayed when there is an emition of empty/null/undefined/empty array
      filter((data: AddressAPIResult[]) => data.length > 0)
    );

  @ViewChild('elSearchAddress', {static: false}) elSearchAddress: ElementRef;
  @Output() addressFound: Observable<AddressAPIResult> = this.selectedAddress$.asObservable();

  isLoading: Subject<boolean> = new Subject();

  // Memory leak prevention
  protected ngUnsubscribe: Subject<void> = new Subject();

  constructor(protected service: Service) {}

  ngOnInit(): void {
    if (this.uri) {
      this.service.uri = this.uri;
    }
  }

  ngAfterViewInit(): void {
    fromEvent(
      this.elSearchAddress.nativeElement, 'keyup'
    ).pipe(
      takeUntil(this.ngUnsubscribe),
      tap(() => this.isLoading.next(true)),
      map((event: Event) => (event.currentTarget as HTMLInputElement).value),
      debounceTime(1000),
      switchMap(data => {
        return this.service.search(data);
      }),
      tap(() => this.isLoading.next(false)),
    ).subscribe((data: AddressAPIResult[]) => {
      this.listAddresses$.next(data);
    });
  }

  // clean memory
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectAddress(address: AddressAPIResult) {
    // change value of the input
    this.elSearchAddress.nativeElement.value = address.properties.label;
    // save the selected address
    this.selectedAddress$.next(address);
    // clear the list
    this.listAddresses$.next([]);
  }
}
