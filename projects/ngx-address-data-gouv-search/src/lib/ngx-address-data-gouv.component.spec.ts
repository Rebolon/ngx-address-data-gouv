import { mock } from "../mocks/address";
import { provideHttpClient } from "@angular/common/http";
import { ComponentRef } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { AddressSearchComponent } from './ngx-address-data-gouv.component';
import { AddressService } from "./ngx-address-data-gouv.service";

describe('AddressSearchComponent', () => {
  let component: AddressSearchComponent;
  let componentRef: ComponentRef<AddressSearchComponent>;
  let fixture: ComponentFixture<AddressSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ {
        provide: AddressService,
        useValue: {
          uri: 'fakeUri',
          search() {
            return of(mock.features)
          }
        }
      },
      provideHttpClient()],
      imports: [ AddressSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressSearchComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render inputs', () => {
    componentRef.setInput('width', '1234')
    componentRef.setInput('loaderSize', '4321')
    componentRef.setInput('id', 'newId')
    componentRef.setInput('uri', 'newUri')
    componentRef.setInput('label', 'newLabel')
    componentRef.setInput('placeholder', 'newPlaceholder')

    fixture.detectChanges()

    expect(component.width()).toBe('1234');
    expect(component.loaderSize()).toBe('4321');
    expect(component.id()).toBe('newId');
    expect(component.uri()).toBe('newUri');
    expect(component.label()).toBe('newLabel');
    expect(component.placeholder()).toBe('newPlaceholder');
    // @todo test dom element attribute

    const elInput = fixture.debugElement.query(By.css('input'));
    expect(elInput.nativeElement.getAttribute('style')).toBe('width: 1234px;')
    expect(elInput.nativeElement.getAttribute('id')).toBe('newId')
    expect(elInput.nativeElement.getAttribute('placeholder')).toBe('newPlaceholder')

    let elLabel = fixture.debugElement.query(By.css('label'));
    expect(elLabel.nativeElement.getAttribute('for')).toBe('newId')
    expect(elLabel.nativeElement.innerText).toBe('newLabel')

    componentRef.setInput('id', null)
    fixture.detectChanges();
    elLabel = fixture.debugElement.query(By.css('label'));
    expect(elLabel).toBeNull()
  });

  it('should render not render label if no id provided', () => {
    componentRef.setInput('id', null)
    fixture.detectChanges()
    const elInput = fixture.debugElement.query(By.css('input'));
    expect(elInput).not.toBeNull()

    const elLabel = fixture.debugElement.query(By.css('label'));
    expect(elLabel).toBeNull()
  });
});
