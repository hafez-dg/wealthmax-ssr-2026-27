import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewsletterService } from '../newsletter.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-sub-newsletter',
  imports: [ReactiveFormsModule, DatePipe, RouterModule, CommonModule],
  templateUrl: './sub-newsletter.component.html',
  styleUrl: './sub-newsletter.component.css',
})
export class SubNewsletterComponent {
  commentForm: FormGroup;
  submitted = false;
  successMsg = '';
  data: any;
  comments: any;
  constructor(
    private fb: FormBuilder,
    private api: NewsletterService,
    private activatedRoute: ActivatedRoute
  ) {
    this.commentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      // subject: ['', [Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]],
      remember: [false],
      newsLetterId: [''],
    });
  }
  ngOnInit() {
    this.getById();
  }

  get f() {
    return this.commentForm.controls;
  }
  image: any;
  getById() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.commentForm.get('newsLetterId')?.setValue(id);
    this.api.getNewsletterById(id).subscribe((x: any) => {
      this.comments = x?.newsLetterReplyDtos;
      this.updateVisibleComments();

      this.data = x;
      this.image =
        'https://wealthmaxstorageaccount.blob.core.windows.net/resmue/' +
        x.image;
    });
  }
  onSubmit(): void {
    this.submitted = true;
    this.successMsg = '';
    if (this.commentForm.invalid) {
      // Scroll to first error (optional)
      const firstInvalid = document.querySelector('.is-invalid');
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const payload = this.commentForm.value;

    this.api.saveReply(payload).subscribe((x: any) => {
      this.getById();
      const modalEl = document.getElementById('successModal') as any;
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
      this.successMsg = 'Thanks! Your comment has been posted.';
      this.commentForm.reset({
        remember: payload.remember,
        newsLetterId: payload.newsLetterId,
      }); // keep remember checkbox state
      this.submitted = false;
    });
    console.log('Submitting comment payload:', payload);

    // Simulate success
  }

  visibleComments: any[] = [];
  currentPage = 1;
  itemsPerPage = 4;

  updateVisibleComments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleComments = this.comments.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.comments.length) {
      this.currentPage++;
      this.updateVisibleComments();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleComments();
    }
  }
}
