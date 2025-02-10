import CButton from "@/components/ui-custom/c-button";
import CFormLabel from "@/components/ui-custom/c-form-label";
import CInput from "@/components/ui-custom/c-input/c-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { useIcons } from "@/hooks/use-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInput, loginInputSchema, useLogin } from "../api/login";

type LoginFormProps = {
   onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
   const [passwordHide, setPasswordHide] = useState(true);
   const { getEyeCloseIcon, getEyeOpenIcon, getMailIcon } = useIcons();
   const login = useLogin({
      onSuccess,
   });

   // 1. Define your form.
   const form = useForm<LoginInput>({
      resolver: zodResolver(loginInputSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: LoginInput) => {
      console.log('here');
      login.mutate(data);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className="!text-black">Email</CFormLabel>
                     <FormControl>
                        <CInput.WithEndIcon
                           getIcon={getMailIcon}
                           placeholder="Email"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <CFormLabel className="!text-black">Password</CFormLabel>
                     <FormControl>
                        <CInput.WithEndButton
                           type={`${passwordHide ? "password" : "text"}`}
                           getIcon={passwordHide ? getEyeCloseIcon : getEyeOpenIcon}
                           onButtonClick={() => setPasswordHide(!passwordHide)}
                           placeholder="Enter your password"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="remember_me"
               render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                     <FormControl>
                        <Checkbox
                           className="border-primary"
                           checked={field.value}
                           onCheckedChange={field.onChange}
                        />
                     </FormControl>
                     <div className="space-y-1 leading-none">
                        <CFormLabel className="!text-base text-c-contrast font-light">
                           Remember me
                        </CFormLabel>
                     </div>
                  </FormItem>
               )}
            />
            <CButton
               loading={login.isPending}
               type="submit"

               className="w-full"
            >
               Login
            </CButton>
         </form>
      </Form>
   );
}
