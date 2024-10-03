import {ChangeDetectionStrategy, Component, effect, inject, input, OnDestroy, Output} from '@angular/core';
import {BehaviorSubject, debounceTime, filter, Observable, ReplaySubject, Subject, switchMap, takeUntil} from 'rxjs';
import {AddressService} from './ngx-address-data-gouv.service';
import {AddressAPIResult} from './ngx-address-data-gouv';
import {AsyncPipe, CommonModule, NgFor, NgStyle} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'ngx-address-data-gouv-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, AsyncPipe, CommonModule,],
  providers: [
    HttpClient,
    AddressService
  ],
  template: `
    @if (id()) {
      <label for="{{id()}}">{{ label() }}</label>
    }

    <input
      id="{{id()}}"
      [placeholder]="placeholder()"
      [ngStyle]="{ width: width()+'px' }"
      [value]="inputValue | async"
      (keyup)="onKeyUp($event)"/>
    <ul [ngStyle]="{ 'width': width()+'px', 'border': (listAddressesForStylish | async) ? '0.2px solid #ccc' : '0px' }">
      @for (addressList of listAddresses | async; track addressList; let isOdd = $odd) {
        <li (click)="selectAddress(addressList)"
            [ngStyle]="{ 'background-color': isOdd ? '#fafafa' : '#f0f0f0'}">
          <span>{{ addressList.properties.label }}</span>
        </li>
      }
    </ul>
  `,
  styles:
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
    `
  ,
})
export class AddressSearchComponent {
  protected service: AddressService = inject(AddressService);

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
  loaderSize = input('15');
  width = input('250');
  placeholder = input('');
  label = input('');
  id = input('ngx-address-search-component-' + (new Date()).getTime());
  uri = input('');
  @Output() isLoading: ReplaySubject<boolean> = new ReplaySubject(1);
  @Output() addressFound: Observable<AddressAPIResult> = this.selectedAddress$.asObservable().pipe(
    filter((value: any) => value && typeof value === 'object' && value.type !== 'undefined')
  );

  constructor() {
    effect(() => this.service.uri = this.uri())

    this.isLoading.next(false);

    this.inputValue.asObservable().pipe(
      takeUntilDestroyed(),
      debounceTime(250),
      filter((value: string) => value.trim().length > 3),
      filter((value: string) =>
        !this.selectedAddress$.getValue().properties
        || value !== this.selectedAddress$.getValue().properties.label
      ),
    ).subscribe(
      () => this.isLoading.next(true)
    );

    this.inputValue.asObservable().pipe(
      takeUntilDestroyed(),
      debounceTime(750),
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
