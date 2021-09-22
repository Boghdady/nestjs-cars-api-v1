import { IsBoolean, IsDefined } from 'class-validator';

export class ApproveReportDto {
  @IsBoolean()
  @IsDefined()
  approved: boolean;
}
