import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AddressSearchComponent } from './ng-address-data-gouv.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
export class NgAddressDataGouvModule {
    constructor(injector) {
        this.injector = injector;
    }
    /* for standalone components */
    ngDoBootstrap() {
        const elRiAd = createCustomElement(AddressSearchComponent, { injector: this.injector });
        customElements.define('ng-address-data-gouv-search', elRiAd);
    }
}
NgAddressDataGouvModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NgAddressDataGouvModule, deps: [{ token: i0.Injector }], target: i0.ɵɵFactoryTarget.NgModule });
NgAddressDataGouvModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: NgAddressDataGouvModule, declarations: [AddressSearchComponent], imports: [BrowserModule,
        CommonModule,
        HttpClientModule], exports: [AddressSearchComponent] });
NgAddressDataGouvModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NgAddressDataGouvModule, imports: [BrowserModule,
        CommonModule,
        HttpClientModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NgAddressDataGouvModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AddressSearchComponent
                    ],
                    imports: [
                        BrowserModule,
                        CommonModule,
                        HttpClientModule,
                    ],
                    exports: [
                        AddressSearchComponent
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ],
                    entryComponents: [
                        AddressSearchComponent,
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYWRkcmVzcy1kYXRhLWdvdXYubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGliL3NyYy9saWIvbmctYWRkcmVzcy1kYXRhLWdvdXYubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxzQkFBc0IsRUFBWSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7QUFxQnRELE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN0QyxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLGFBQWE7UUFDWCxNQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUN0RixjQUFjLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7O29IQVJVLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGlCQWpCaEMsc0JBQXNCLGFBR3RCLGFBQWE7UUFDYixZQUFZO1FBQ1osZ0JBQWdCLGFBR2hCLHNCQUFzQjtxSEFTYix1QkFBdUIsWUFkaEMsYUFBYTtRQUNiLFlBQVk7UUFDWixnQkFBZ0I7MkZBWVAsdUJBQXVCO2tCQW5CbkMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osc0JBQXNCO3FCQUN2QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHNCQUFzQjtxQkFDdkI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIEluamVjdG9yLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FkZHJlc3NTZWFyY2hDb21wb25lbnR9IGZyb20gJy4vbmctYWRkcmVzcy1kYXRhLWdvdXYuY29tcG9uZW50JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Y3JlYXRlQ3VzdG9tRWxlbWVudH0gZnJvbSAnQGFuZ3VsYXIvZWxlbWVudHMnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFkZHJlc3NTZWFyY2hDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBZGRyZXNzU2VhcmNoQ29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFtcbiAgICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIEFkZHJlc3NTZWFyY2hDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nQWRkcmVzc0RhdGFHb3V2TW9kdWxlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgfVxuXG4gIC8qIGZvciBzdGFuZGFsb25lIGNvbXBvbmVudHMgKi9cbiAgbmdEb0Jvb3RzdHJhcCgpIHtcbiAgICBjb25zdCBlbFJpQWQgPSBjcmVhdGVDdXN0b21FbGVtZW50KEFkZHJlc3NTZWFyY2hDb21wb25lbnQsIHtpbmplY3RvcjogdGhpcy5pbmplY3Rvcn0pO1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbmctYWRkcmVzcy1kYXRhLWdvdXYtc2VhcmNoJywgZWxSaUFkKTtcbiAgfVxuICAvKiAqL1xufVxuIl19