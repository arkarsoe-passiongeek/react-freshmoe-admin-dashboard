import CButton from '@/components/custom/c-button';
import CFormLabel from '@/components/custom/c-form-label';
import CImageDropZone from '@/components/custom/c-image-dropzone';
import CInput from '@/components/custom/c-input';
import { Checkbox } from '@/components/ui/checkbox';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import useSearchParams from '@/hooks/use-search-params';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
   updateContentInputSchema,
   useUpdateContent,
} from '../api/update-content';
import { useContent } from '../hooks';

// Type inference for the form schema
type ContentFormSchema = z.infer<typeof updateContentInputSchema>;

// Props type for the component
interface ContentCreateFormProps {
   onCreateSuccess: () => void;
}

export default function ContentCreateForm({
   onCreateSuccess,
}: Readonly<ContentCreateFormProps>) {
   const searchParams = useSearchParams();
   const contentQuery = useContent({ id: searchParams.get('contentId') });
   const updateContentMutation = useUpdateContent({
      mutationConfig: {
         onSuccess: () => {
            console.log('update success');
         },
      },
   });

   const content = contentQuery.data?.data;

   // Define the form with validation and default values
   const form: UseFormReturn<ContentFormSchema> = useForm<ContentFormSchema>({
      resolver: zodResolver(updateContentInputSchema),
      defaultValues: {
         title: '', // Default empty title
         description: '', // Default empty description
         image: null as unknown as File, // Placeholder for a file (requires actual file input during usage)
      },
   });

   // Submit handler
   async function onSubmit({ check, ...values }: Partial<ContentFormSchema>) {
      updatecontent.mutate({
         data: {
            ...values,
            page: searchParams.get('page'),
            section: searchParams.get('section'),
         },
      });
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 h-full'>
            <div className='h-full flex flex-col justify-between'>
               <div className='space-y-5'>
                  <FormField
                     control={form.control}
                     name='image'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black'>Name</CFormLabel>
                           <FormControl>
                              <div className='border rounded-xl p-4'>
                                 <CImageDropZone
                                    onValueChange={value =>
                                       field.onChange(value)
                                    }
                                 />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='title'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black'>Name</CFormLabel>
                           <FormControl>
                              <CInput.Base placeholder='Name' {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='description'
                     render={({ field }) => (
                        <FormItem>
                           <CFormLabel className='!text-black'>
                              Description
                           </CFormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder='Tell us a little bit about yourself'
                                 className='resize-none'
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className='space-y-4'>
                  <FormField
                     control={form.control}
                     name='check'
                     render={({ field }) => (
                        <FormItem className='flex flex-col items-start space-x-3 space-y-3'>
                           <div className='flex gap-3 w-full'>
                              <FormControl>
                                 <Checkbox
                                    className='border-primary'
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              </FormControl>

                              <div className='space-y-1 leading-none'>
                                 <CFormLabel className='text-sm text-c-contrast font-light'>
                                    Are you sure you want to{' '}
                                    <span className='text-primary'>Create</span>{' '}
                                    it?
                                 </CFormLabel>
                              </div>
                           </div>
                           <FormMessage className='!ml-0' />
                        </FormItem>
                     )}
                  />
                  <div className='flex gap-4 justify-end'>
                     <CButton
                        size='md'
                        styleType='cancel'
                        type='button'
                        className=' '
                        onClick={() => form.reset()}>
                        Cancel
                     </CButton>
                     <CButton
                        size='md'
                        loading={createContentMutation.isPending}
                        styleType='create'
                        type='submit'>
                        Create
                     </CButton>
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
}
