import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(body: CreateReportDto, user: User): Promise<Report> {
    const report = await this.repo.create(body);
    report.user = user;
    return await this.repo.save(report);
  }

  async changeReportApproval(
    id: string,
    body: ApproveReportDto,
  ): Promise<Report> {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = body.approved;
    return this.repo.save(report);
  }
}
