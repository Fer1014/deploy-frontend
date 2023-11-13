import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { University } from 'src/app/models/university';
import { CourseService } from 'src/app/services/course.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-creaedita-course',
  templateUrl: './creaedita-course.component.html',
  styleUrls: ['./creaedita-course.component.css'],
})
export class CreaeditaCourseComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  curso: Course = new Course();
  mensaje: string = '';
  listaUniversidades: University[] = [];
  tiposCursos: { value: string; viewValue: string }[] = [
    { value: 'Especialidad', viewValue: 'Especialidad' },
    { value: 'General', viewValue: 'General' },
    { value: 'Electivo', viewValue: 'Electivo' },
  ];
  creditos: { value: number; viewValue: number }[] = [
    { value: 2, viewValue: 2 },
    { value: 4, viewValue: 4 },  
    { value: 5, viewValue: 5 },
    { value: 8, viewValue: 8 },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UniversityService,
    private cS: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      credits: ['', Validators.required],
      type: ['', Validators.required],
      semester: ['', Validators.required],
      university: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUniversidades = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.curso.nameCourse = this.form.value.name;
      this.curso.creditsCourse = this.form.value.credits;
      this.curso.typeCourse = this.form.value.type;
      this.curso.semesterCourse = this.form.value.semester;
      this.curso.university.idUniversity = this.form.value.university;
      this.cS.insert(this.curso).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['cursos']);
    } else {
      this.mensaje = 'Completo los campos!!';
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
