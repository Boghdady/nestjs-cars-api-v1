import { Expose } from 'class-transformer';

export class UserResponseDto {
  // Expose => show the property into returned response
  // Exclude => hide the property into returned response
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;
}
