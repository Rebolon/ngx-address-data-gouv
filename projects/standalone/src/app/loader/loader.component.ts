import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
      <div class="icon-container" *ngIf="isLoading" [ngStyle]="getContainerStyles()">
          <i class="loader" [ngStyle]="getIconStyles()"></i>
      </div>
  `,
  styles: [
    `
      .icon-container {
          position: relative;
          top: -17px;
      }

      .loader {
          position: relative;
          display: inline-block;
          animation: around 5.4s infinite;
      }

      @keyframes around {
          0% {
              transform: rotate(0deg)
          }
          100% {
              transform: rotate(360deg)
          }
      }

      .loader::after, .loader::before {
          content: "";
          background: white;
          position: absolute;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-width: 2px;
          border-color: #333 #333 transparent transparent;
          border-style: solid;
          border-radius: 20px;
          box-sizing: border-box;
          top: 0;
          left: 0;
          animation: around 0.7s ease-in-out infinite;
      }

      .loader::after {
          animation: around 0.7s ease-in-out 0.5s infinite;
          background: transparent;
      }`
  ],
})
export class LoaderComponent {
  @Input() size = 15;
  @Input() position = 250;
  @Input() isLoading = 0;

  getContainerStyles() {
    return {
      left: (this.position - (this.size + 2)) + 'px',
    };
  }

  getIconStyles() {
    return {
      height: this.size + 'px',
      width: this.size + 'px'
    };
  }
}
