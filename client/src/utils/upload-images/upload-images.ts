import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  templateUrl: './upload-images.html',
  styleUrl: './upload-images.css',
})
export class UploadImages {
  protected imageSrc = signal<string | ArrayBuffer | null | undefined>(null);
  private fileToUpload: File | null = null;

  uploadFile = output<File>();
  loading = input<boolean>(false);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileToUpload = file;
    this.previewImage(file);

    input.value = '';
  }

  onCancel() {
    this.fileToUpload = null;
    this.imageSrc.set(null);
  }

  onUploadFile() {
    console.log(111);
    if (this.fileToUpload) {
      this.uploadFile.emit(this.fileToUpload);
    }
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => this.imageSrc.set(e.target?.result);
    reader.readAsDataURL(file);
  }
}


