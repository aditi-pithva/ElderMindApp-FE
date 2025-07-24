import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationScreenComponent } from './conversation-screen/conversation-screen.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

export const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'assessment', component: ConversationScreenComponent },
  { path: '**', redirectTo: '' }
  // Add other section routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
