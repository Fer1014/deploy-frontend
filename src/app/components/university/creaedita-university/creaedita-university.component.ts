import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { University } from 'src/app/models/university';
import { UniversityService } from 'src/app/services/university.service';
import * as moment from 'moment';
@Component({
  selector: 'app-creaedita-university',
  templateUrl: './creaedita-university.component.html',
  styleUrls: ['./creaedita-university.component.css'],
})
export class CreaeditaUniversityComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  universidad: University = new University();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  id: number = 0;
  edicion: boolean = false;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'Pública', viewValue: 'Pública' },
    { value: 'Privada', viewValue: 'Privada' },
  ];

  constructor(
    private uS: UniversityService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUniversity: [''],
      nameUniversity: ['', Validators.required],
      adressUniversity: ['', Validators.required],
      creationDateUniversity: ['', [Validators.required]],
      typeUniversity: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.universidad.idUniversity = this.form.value.idUniversity;
      this.universidad.nameUniversity = this.form.value.nameUniversity;
      this.universidad.typeUniversity = this.form.value.typeUniversity;
      this.universidad.creationDateUniversity =
        this.form.value.creationDateUniversity;
      this.universidad.adressUniversity = this.form.value.adressUniversity;
      if (this.edicion) {
        this.uS.update(this.universidad).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.universidad).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['universidades']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUniversity: new FormControl(data.idUniversity),
          nameUniversity: new FormControl(data.nameUniversity),
          adressUniversity: new FormControl(data.adressUniversity),
          typeUniversity:new FormControl(data.typeUniversity),
          creationDateUniversity: new FormControl(data.creationDateUniversity),
        });
      });
    }
  }
}
