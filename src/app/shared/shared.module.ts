import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [NavigationComponent],
  declarations: [NavigationComponent],
  providers: [],
})
export class SharedModule {}
