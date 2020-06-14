import {User} from "./users";
import { NgxGalleryImage } from 'ngx-gallery';
import {Code} from "./code";


export interface Image {
  _id?: string;
  filename?: string;
  doc_id?: string;
  base64?: string;
  filesize?: number;
  description?: string;
  orientation?: number;
  group?: string;
  type?: string;
  image?: string;
  thumbImage?: string;
  createdBy?: User;
  createdAt?: Date;
}

export interface GroupedImage {
  [Key: string]: [NgxGalleryImage]
}

export interface MultipleImageResponse {
  code: Code;
  photos: [Image];
}
