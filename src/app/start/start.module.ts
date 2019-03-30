import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartComponent } from './container/start/start.component';
import { startRoutes } from './start.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(startRoutes)],
  exports: [],
  declarations: [StartComponent],
  providers: [],
})
export class StartModule {}
