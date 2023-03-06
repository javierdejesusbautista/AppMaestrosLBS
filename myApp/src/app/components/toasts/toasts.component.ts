import { NgTemplateOutlet, NgIf, NgFor,  } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: { class: 'toast-container position-fixed bottom-0 start-0 p-3', style: 'z-index: 1200' },
})
export class ToastsComponent implements OnInit {

	constructor(public toastService: ToastService) {}

	isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}

	ngOnInit(): void {
		
	}

}
