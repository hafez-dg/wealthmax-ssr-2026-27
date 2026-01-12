import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../modules/shared/imports';
import { CareersService } from '../careers.service';
import { JobApplicationDialogComponentComponent } from '../../../common/Jobform/job-application-dialog-component/job-application-dialog-component.component';

interface Job {
  jobId: string;
  jobTitle: string;
  jobdesp: string;
  type: string;
  department: string;
  dpt?: string;
  jobLocation?: string;
  date?: string;
  datePosted?: string;   // ✅ ADD THIS
  createdAt?: string;
  workstyle?: string;
  applyBy?: string;
  reqskill?: string[];
  jobbfts?: string[];
  jobrpb?: string[];
  status?: string;
  workingPattern?: string[];
  officeTiming?: string;
  officeDay?: string;
}


@Component({
  selector: 'app-h-career3',
  standalone: true,
  imports: [...SHARED_IMPORTS, CommonModule],
  templateUrl: './h-career3.component.html',
  styleUrls: ['./h-career3.component.css'],
})
export class HCareer3Component implements OnInit {
  emailcarrer: string = 'careers@wealthmax.co.uk';
  @Input() data: Job[] | null = null;

  careers: Job[] = [];

  activeCareers: Job[] = [];

  constructor(
    private dialog: MatDialog,
    private careersService: CareersService
  ) {}

  ngOnInit(): void {
    if (Array.isArray(this.data) && this.data.length > 0) {
      this.careers = this.data;
      this.updateActiveCareers();
    } else {
      this.careersService.getAllCareers().subscribe({
        next: (resp: any) => {
          this.careers = Array.isArray(resp) ? resp : resp?.data ?? [];
          this.updateActiveCareers();
        },
        error: (err) => {
          this.careers = [];
          this.updateActiveCareers();
        },
      });
    }
  }

  private updateActiveCareers() {
    this.activeCareers = (this.careers || []).filter((j) => {
      const status = j?.status;
      if (!status) return false;
      return String(status).trim().toUpperCase() === 'ACTIVE';
    });
  }

  openJobApplicationDialog(job: any) {
    const dialogWidth = window.innerWidth <= 767 ? '95vw' : '60vw';

    const getValue = (obj: any, ...keys: string[]) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) {
          return obj[key];
        }
      }
      return null;
    };

    this.dialog.open(JobApplicationDialogComponentComponent, {
      width: dialogWidth,
      maxWidth: '92vw',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: false,
      restoreFocus: true,

      data: {
        jobId: getValue(job, 'jobid', 'jobId'),
        jobTitle: getValue(job, 'jobTitle'),
        jobdesp: getValue(job, 'jobDescription'),
        department: getValue(job, 'department', 'dept', 'dpt'),
        dpt: getValue(job, 'dpt', 'department'),
        jobLocation: getValue(job, 'jobLocation', 'location'),
        workstyle: getValue(job, 'workstyle', 'workStyle'),
        jobtype: getValue(job, 'type', 'jobtype', 'jobType'),
        dateposted: getValue(job, 'datePosted'),
        jobapplybeforedate: getValue(
          job,
          'applybeforedate',
          'applyBeforeDate',
          'applyBy'
        ),
        reqskill: getValue(job, 'reqskill', 'reqSkill') || [],
        jobbfts: getValue(job, 'jobbfts', 'jobBfts') || [],
        jobrpb: getValue(job, 'jobrpb', 'jobRpb') || [],
        workingPattern: getValue(job, 'workingPattern') || [],
        status: getValue(job, 'status'),
        officeTiming: getValue(job, 'officeTiming'),
        officeDay: getValue(job, 'officeDay'),
      },
    });
  }

  trackByJob(index: number, job: Job) {
    return job.jobId || index;
  }
}
