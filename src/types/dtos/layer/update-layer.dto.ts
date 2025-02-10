import { Exclude } from 'class-transformer';

export class UpdateLayer {
   name: string;
   @Exclude()
   consent: boolean;
}
