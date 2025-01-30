import { getImageUrl } from '@/lib/utils';
import { Cloud, Image } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

interface CImageDropZoneProps {
   onValueChange: (file: File) => void;
   imgUrl?: string;
   onImageDelete?: () => void;
}

export default function CImageDropZone({
   onValueChange,
   imgUrl,
   onImageDelete,
}: CImageDropZoneProps) {
   const [prevImage, setPrevImage] = useState(imgUrl);
   const [selectedImage, setSelectedImage] = useState(imgUrl);
   const [droppable, setDroppable] = useState(false);

   const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer): string => {
      // Create a Uint8Array from the ArrayBuffer
      const uint8Array = new Uint8Array(arrayBuffer);

      // Convert the Uint8Array to a string (binary string)
      let binaryString = '';
      uint8Array.forEach(byte => {
         binaryString += String.fromCharCode(byte);
      });

      // Encode the binary string to Base64
      return btoa(binaryString);
   };

   const onDrop = useCallback((acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
         const reader = new FileReader();
         console.log(file);
         reader.onabort = () => console.log('file reading was aborted');
         reader.onerror = () => console.log('file reading has failed');
         reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            setSelectedImage(arrayBufferToBase64(binaryStr as ArrayBuffer));
            console.log(file instanceof File);
            setDroppable(false);
            onValueChange(file);
         };
         reader.readAsArrayBuffer(file);
      });
   }, []);
   const { getRootProps, getInputProps } = useDropzone({ onDrop });

   const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      // e.preventDefault()
      setDroppable(false);
      setSelectedImage('');
      setPrevImage('');
      onImageDelete?.();
   };

   const handleDragOver = () => {
      setDroppable(true);
   };

   const handleDragLeave = () => {
      setDroppable(false);
   };

   return (
      <div
         {...getRootProps()}
         className='w-full h-full rounded ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
         <label className='hidden' htmlFor='imageUpload'>
            Image Upload
         </label>
         <input id='imageUpload' {...getInputProps()} />
         <div className='w-full h-full'>
            <div
               onDragOver={handleDragOver}
               onDragLeave={handleDragLeave}
               className='space-y-[10px] flex flex-col items-center justify-center w-full h-full'>
               {!selectedImage && !droppable && (
                  <>
                     <Cloud />
                     <p className='text-base'>Drug & Drop Files or Browser</p>
                     <Button
                        type='button'
                        className='rounded w-[130px] h-[36px] text-base hover:bg-c-hover'>
                        Upload Photo
                     </Button>
                  </>
               )}
               {droppable && (
                  <div>
                     <Image />
                  </div>
               )}

               {selectedImage && !droppable && (
                  <div className='flex flex-col justify-center items-center h-full'>
                     <div className='space-y-[10px] flex flex-col justify-center items-center'>
                        {!prevImage && (
                           <img
                              className='w-[107px]'
                              src={`data:image/png;base64,${selectedImage}`}
                              alt=''
                           />
                        )}
                        {prevImage && (
                           <img
                              className='max-h-[200px] object-cover w-full'
                              src={getImageUrl(prevImage)}
                              alt='original'
                           />
                        )}
                        <div className='flex gap-[10px]'>
                           {/* <Button className='rounded w-[130px] hover:bg-c-hover'>Upload Photo</Button> */}
                           <Button
                              type='button'
                              onClick={onCancel}
                              className='rounded w-[130px] h-[36px] text-base bg-c-border-stork text-black'>
                              Cancel
                           </Button>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
