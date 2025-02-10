import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function convertBase64(file: File): Promise<string> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => {
         reject(
            new Error(
               (error.target as FileReader).error?.message ??
                  'An error occurred',
            ),
         );
      };
   });
}

export const date = {
   show: (isoDate: Date | string): string => {
      // Parse the ISO 8601 date string into a Date object
      const date = new Date(isoDate);

      // Define an array of month names
      const months = [
         'Jan',
         'Feb',
         'Mar',
         'Apr',
         'May',
         'Jun',
         'Jul',
         'Aug',
         'Sep',
         'Oct',
         'Nov',
         'Dec',
      ];

      // Extract the day, month, and year
      const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for the day
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      // Format the date into the desired string
      return `${day} ${month} ${year}`;
   },
};
