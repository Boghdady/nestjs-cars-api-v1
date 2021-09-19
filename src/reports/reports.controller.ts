import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/users/decoratos/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
