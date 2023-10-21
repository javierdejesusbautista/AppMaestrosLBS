import { ChangeDetectionStrategy,Component } from '@angular/core';

@Component({
  selector: 'skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoadingComponent {

}
