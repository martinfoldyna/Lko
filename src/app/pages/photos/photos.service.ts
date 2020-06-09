import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpEventType} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
import {Image, MultipleImageResponse} from "../../@core/data/image";
import {FileReaderEvent} from "../../@core/data/FileReaderEvenet";
import {NgxImageCompressService} from "ngx-image-compress";
import {CompressedPhoto} from "../../@core/data/photo";
import {ResultResponse} from "../../@core/data/response";
import {Config} from "../../../conf";


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http: HttpClient,
    private imageCompress: NgxImageCompressService,

  ) { }

  upload(data, headers?) {
    return this.http.post(`${Config.apiUrl}photo/upload`, data, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    }).pipe(map((event) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          console.log(progress);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

  edit(image: Image) {
    return this.http.post(`${Config.apiUrl}photo/edit/${image._id}`, {filename: image.filename, description: image.description, type: image.type})
  }

  loadImages(subject): Observable<MultipleImageResponse> {
    return this.http.get<MultipleImageResponse>(`${Config.apiUrl}photo/retrieve/${subject}/thumbs`);
  }

  loadBigImages(subject): Observable<MultipleImageResponse> {
    return this.http.get<MultipleImageResponse>(`${Config.apiUrl}photo/retrieve/${subject}/all`);
  }

  deleteGroup(group): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(`${Config.apiUrl}photo/deleteGroup/${group}`, []);
  }

  getOrientation(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function(e: FileReaderEvent) {

        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8)
        {
          resolve(-2);
        }
        var length = view.byteLength, offset = 2;
        while (offset < length)
        {
          if (view.getUint16(offset+2, false) <= 8) resolve(-1);
          var marker = view.getUint16(offset, false);
          offset += 2;
          if (marker == 0xFFE1)
          {
            if (view.getUint32(offset += 2, false) != 0x45786966)
            {
              resolve(-1);
            }

            var little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;
            for (var i = 0; i < tags; i++)
            {
              if (view.getUint16(offset + (i * 12), little) == 0x0112)
              {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          }
          else if ((marker & 0xFF00) != 0xFF00)
          {
            break;
          }
          else
          {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      };
      reader.readAsArrayBuffer(file);

    })
  }

  rotateImage(orientation) {
    let degrees = 0;
    switch(orientation) {
      case 1: degrees = 0; break;
      case 3: degrees = 180; break;
      case 6: degrees = 90; break;
      case 8: degrees = 270; break;
    }

    return `rotate(${degrees}deg)`;
  }

  dataURItoBlob(dataURI) {
    console.log('in dataURItoBlob')
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i ++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: 'image/jpeg'});
    return blob;
  }

  compressFile(image, fileName, imgOrientation, quality): Promise<CompressedPhoto> {
    return new Promise(((resolve, reject) => {
      let orientation = -1;
      let sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
      let sizeOfCompressedImage;
      let imgResultAfterCompress;
      let localCompressedUrl;

      console.log('Size in kilobytes now:', sizeOfOriginalImage);

      if (sizeOfOriginalImage > 11) {
        quality = 60;
      }
      this.imageCompress.compressFile(image, imgOrientation, quality, quality).then(result => {
        imgResultAfterCompress = result;
        localCompressedUrl = result;

        sizeOfCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024);
        let blob = this.dataURItoBlob(imgResultAfterCompress.split(',')[1]);

        //Files, that will be shown before upload


        console.log('Size in kilobytes after compression:', sizeOfCompressedImage);

        const returnResult: CompressedPhoto = {
          size: this.imageCompress.byteCount(result) / (1024 * 1024),
          src: imgResultAfterCompress,
          blob: blob,
          fileName: fileName,
          orientation: imgOrientation
        }

        resolve(returnResult);
        if(!returnResult) {
          reject('error occured');
        }

      })
    }))
  }
}
