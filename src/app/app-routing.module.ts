import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityComponent } from './components/university/university.component';
import { CreaeditaUniversityComponent } from './components/university/creaedita-university/creaedita-university.component';
import { CreaeditaCourseComponent } from './components/course/creaedita-course/creaedita-course.component';
import { CourseComponent } from './components/course/course.component';

const routes: Routes = [
  {
    path: 'universidades',
    component: UniversityComponent,
    children: [
      { path: 'nuevo', component: CreaeditaUniversityComponent },
      { path: 'ediciones/:id', component: CreaeditaUniversityComponent },
    ],
  },
  {
    path: 'cursos',
    component: CourseComponent,
    children: [{
      path:'nuevo',component:CreaeditaCourseComponent
    }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
