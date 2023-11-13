import { Component, OnInit, ViewChild } from '@angular/core';
import { University } from 'src/app/models/university';
import { MatTableDataSource } from '@angular/material/table';
import { UniversityService } from 'src/app/services/university.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-listar-university',
  templateUrl: './listar-university.component.html',
  styleUrls: ['./listar-university.component.css'],
})
export class ListarUniversityComponent implements OnInit {
  dataSource: MatTableDataSource<University> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'codigo',
    'universidad',
    'fecha',
    'direccion',
    'tipo',
    'accion01',
    'accion02',
  ];

  constructor(private uS: UniversityService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
