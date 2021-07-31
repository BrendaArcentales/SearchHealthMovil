import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';


import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {Filesystem, Directory } from '@capacitor/filesystem'
import { Capacitor } from '@capacitor/core';

export function usePhotoGallery() {

  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    try {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log("cameraPhoto", cameraPhoto);
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(cameraPhoto, fileName);
      const newPhotos = [savedFileImage];
      setPhotos(newPhotos);
    }catch (error){
      console.log(error);
    }
  };

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        data: base64Data,
        format: photo.format
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: savedFile.uri,
        webviewPath: photo.webPath,
        data: base64Data,
        format: photo.format
      };
    }
  };

  return {
    photos,
    takePhoto
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  data: any;
  format: any;
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string')
      }
    };
    reader.readAsDataURL(blob);
  });
}
