
export type UploadedFile = {
  name: string;
  size: number;
  base64: string | undefined;
}

export type UploadedImage = UploadedFile & {
  width: number;
  height: number;
};

export const FileToBase64 = (file: File) => {
    return new Promise<UploadedFile>(resolve => {
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result?.toString();
        resolve({
          name: file.name,
          size: file.size, 
          base64: baseURL});
      };
    });
  };

  export const ImageToBase64 = (file: File) => {
    return new Promise<UploadedImage>(resolve => {
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        let image = new Image();
        image.src = reader.result ? reader.result.toString() : '';
        
        image.onload = () => {
          // Make a fileInfo Object
          resolve({
            name: file.name,
            size: file.size, 
            base64: image.src,
            width: image.width,
            height: image.height
          });
        };
      };
    });
  };