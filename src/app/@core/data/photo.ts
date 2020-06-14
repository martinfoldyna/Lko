export interface NewPhotoSet {
  description: string;
  files: any;
}

export interface CompressedPhoto {
  size?: number;
  src?: string;
  blob?: Blob;
  fileName?: string;
  orientation?: number;
  description?: string;
}
