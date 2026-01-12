import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../src/environments/environment.staging';

interface TeamMember {
  createdAt: string;
  updatedAt: string | null;
  id: number;
  name: string;
  designation: string;
  category: string | null;
  fileName?: string | null;
  linkedInUrl?: string | null;
  emailUrl?: string | null;
}

@Component({
  selector: 'app-meet2-datadisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meet2-datadisplay.component.html',
  styleUrls: ['./meet2-datadisplay.component.css'],
})
export class Meet2DatadisplayComponent implements OnInit {
  private allMembers: TeamMember[] = [];
  emprole: TeamMember[] = [];

  loading = false;
  noData = false;

  selectedRole = 'All';
  // roles will be objects like { role: 'Founder' }
  roles: { role: string }[] = [{ role: 'All' }];

  public environment = environment;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getempdata();
  }

  private normalize(s: string | null | undefined) {
    return (s ?? '').toString().trim().toLowerCase();
  }

  getempdata() {
    this.loading = true;
    this.noData = false;

    const url = `${environment.apiUrl}team-members/getAll`;

    this.http.get<TeamMember[]>(url).subscribe({
      next: (res) => {
        this.allMembers = res ?? [];
        this.emprole = [...this.allMembers];
        this.noData = this.emprole.length === 0;
        this.loading = false;

        // derive unique roles/categories from data
        const unique = Array.from(
          new Set(
            this.allMembers
              .map((m) => m.category ?? '')
              .map((c) => c.trim())
              .filter((c) => c.length > 0)
          )
        );

        // set roles with 'All' first
        this.roles = [{ role: 'All' }, ...unique.map((r) => ({ role: r }))];

        // ensure selectedRole stays valid (if backend categories changed)
        if (!this.roles.some((x) => this.normalize(x.role) === this.normalize(this.selectedRole))) {
          this.selectedRole = 'All';
          this.emprole = [...this.allMembers];
        }
      },
      error: (err) => {
        console.error('Error fetching employee data:', err);
        this.loading = false;
        this.noData = true;
      },
    });
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.loading = true;
    this.noData = false;

    // show all
    if (this.normalize(role) === this.normalize('All')) {
      this.emprole = [...this.allMembers];
      this.noData = this.emprole.length === 0;
      this.loading = false;
      return;
    }

    // exact normalized match
    let filtered = this.allMembers.filter(
      (e) => this.normalize(e.category) === this.normalize(role)
    );

    // fallback: looser matching if exact fails (handles plural/typo differences)
    if (filtered.length === 0) {
      const roleNorm = this.normalize(role);
      filtered = this.allMembers.filter((e) => {
        const cat = this.normalize(e.category);
        return cat && (cat.includes(roleNorm) || roleNorm.includes(cat));
      });
    }

    this.emprole = filtered;
    this.noData = this.emprole.length === 0;
    this.loading = false;
  }
  trackById(index: number, item: TeamMember): number {
    return item.id;
  }
}
