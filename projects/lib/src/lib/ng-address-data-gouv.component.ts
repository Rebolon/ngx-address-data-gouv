import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinct,
  filter,
  fromEvent,
  map,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';
import {Service} from './ng-address-data-gouv.service';
import {AddressAPIResult} from './ng-address-data-gouv';

@Component({
  selector: 'ng-address-data-gouv-search',
  template: `
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
export class AddressSearchComponent implements OnInit, OnDestroy {
  // data store containers
  protected selectedAddress$: BehaviorSubject<AddressAPIResult> = new BehaviorSubject({} as AddressAPIResult);
  protected listAddresses$: Subject<AddressAPIResult[]> = new Subject() as Subject<AddressAPIResult[]>;
  listAddresses: Observable<AddressAPIResult[]> = this.listAddresses$.asObservable();
  listAddressesForStylish: Observable<AddressAPIResult[]> = this.listAddresses
    .pipe(
      // prevent the border style to be displayed when there is an emition of empty/null/undefined/empty array
      filter((data: AddressAPIResult[]) => data.length > 0)
    );
  protected inputValue: BehaviorSubject<string> = new BehaviorSubject("");

  // components API
  @Input() loaderSize = 15;
  @Input() width = 250;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() id = 'ri-address-search-component-' + (new Date()).getTime();
  @Input() uri: string = '';
  @Output() isLoading: ReplaySubject<boolean> = new ReplaySubject(1);
  @Output() addressFound: Observable<AddressAPIResult> = this.selectedAddress$.asObservable();

  // Memory leak prevention
  protected ngUnsubscribe: Subject<void> = new Subject();

  constructor(protected service: Service) {}

  ngOnInit(): void {
    if (this.uri) {
      this.service.uri = this.uri;
    }

    this.isLoading.next(false);

    this.inputValue.asObservable().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      () => this.isLoading.next(true)
    );

    this.inputValue.asObservable().pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(1000),
      filter((value: string) => value.trim().length > 3),
      filter((value: string) =>
        !this.selectedAddress$.getValue().properties
        || value !== this.selectedAddress$.getValue().properties.label
      ),
      switchMap((data: string) => this.service.search(data))
    ).subscribe((data: AddressAPIResult[]) => {
      this.listAddresses$.next(data);
      this.isLoading.next(false);
    });
  }

  // clean memory
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onKeyUp(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    if (value === this.inputValue.getValue()) {
      return;
    }

    this.inputValue.next(value);
  }

  // @todo : is there a way to code thos 3 lines in a way where order is not important ? here if i move the
  // inputValue.next then it can call again the Api
  selectAddress(address: AddressAPIResult) {
    // save the selected address
    this.selectedAddress$.next(address);
    // clear the list
    this.listAddresses$.next([]);
    // change value of the input
    this.inputValue.next(address.properties.label);
  }
}