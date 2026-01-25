import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.querySelector('#toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end'
      document.body.appendChild(container)
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 3000) {
    const toastContainer = document.querySelector('#toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg', 'flex',
      'items-center', 'gap-3', 'cursor-pointer');

    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    })

    toastContainer.append(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
