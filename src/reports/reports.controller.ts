import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decoratos/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { Serialize } from 'src/utils/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimatesDto } from './dtos/get-estimates.dto';
import { ReportResponseDto } from './dtos/report-response.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeReportApproval(id, body);
  }

  @Get()
  getEstimates(@Query() query: GetEstimatesDto) {
    return this.reportsService.createCarEstimates(query);
  }
}
