import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { CallbackComponent } from './components/callback/callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent, CallbackComponent],
  imports: [CommonModule,FormsModule,
    ReactiveFormsModule
  ],
})
export class AuthenticationModule {}
