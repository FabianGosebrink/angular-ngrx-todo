import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ErrorHandlerService } from './error/errorhandler.service';
import { HeaderInterceptor } from './interceptors/header.interceptor';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
})
export class CoreModule {}
