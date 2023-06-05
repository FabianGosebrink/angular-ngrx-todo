import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DoggoMainComponent } from './container/doggo-main/doggo-main.component';
import { TodoEffects } from './store/todo.effects';
import { todoReducer } from './store/todo.reducer';
import { featureName } from './store/todo.selectors';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: DoggoMainComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(featureName, todoReducer),
        EffectsModule.forFeature([TodoEffects])
      ),
    ],
  },
];
