import { Expose, Transform } from 'class-transformer';

export class ReportResponseDto {
  // Expose => show the property into returned response
  // Exclude => hide the property into returned response
  @Expose()
  id: number;

  @Expose()
  model: string;

  @Expose()
  make: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  price: number;

  // Extract the user id from report entity (obj) and assign it to user_id
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  user_id: number;
}
