import { XCircle } from 'phosphor-react';
import React, { ChangeEvent, useState } from 'react';
import { ImageToBase64, UploadedImage } from '../../libs/upload';

export interface InputImageProps {
  label?: string;
  errors?: string[] | null;
  image?: UploadedImage
  onImageUploaded: (image: UploadedImage|undefined) => void
}

export const InputImage = ({label, errors, image, onImageUploaded} : InputImageProps) => {

  const [upload, setUpload] = useState<UploadedImage|undefined>(image);

  const onFileUploaded = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) {
      return;
    }

    ImageToBase64(event.target.files[0])
      .then(data => {
        updateUpload(data)
      })
  }

  const updateUpload = (data: UploadedImage|undefined) => {
    setUpload(data);
    onImageUploaded(data);
  }

  return (
    <fieldset className="mb-4">
      {label && <label className="inline-block text-sm mb-2">{label}</label>}
      {upload ? 
        <div className='relative h-60 w-60 p-4 border'>
          <a onClick={()=>updateUpload(undefined)} className='absolute top-1 right-1 text-rose-600 text-xl'><XCircle/></a>
          <img className='absolute m-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' src={upload.base64}></img>
        </div>
        :
        <>
          <input className={`${errors ? 'border-rose-600 ring-1 ring-rose-600' : ''} block text-sm w-full px-4 py-2 text-zinc-800 bg-white border-zinc-400 rounded overflow-visible transition-colors ease-in-out duration-150 focus:border-cyan-500 focus:ring-0 focus:outline-0 shadow-none`} 
            type='file' 
            onChange={onFileUploaded}
            accept='.jpeg, .png, .jpg'
            />
          {errors && errors.map((error,i) => {
            return (<p key={i} className='text-xs text-rose-600'>{error}</p>)
          })}
        </>
      }
    </fieldset>
  )
}
