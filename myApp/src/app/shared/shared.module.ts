import { NgModule } from '@angular/core';
import { layoutComponent } from './layout/layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { menuLayoutComponent } from './components/menu/menu-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        IonicModule,
        RouterModule,
        CommonModule,
        FormsModule,
    ],
    exports: [layoutComponent,menuLayoutComponent],
    declarations: [layoutComponent,menuLayoutComponent],
    providers: [],
})
export class sharedModule { }
