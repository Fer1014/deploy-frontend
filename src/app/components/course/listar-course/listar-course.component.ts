import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-listar-course',
  templateUrl: './listar-course.component.html',
  styleUrls: ['./listar-course.component.css'],
})
export class ListarCourseComponent implements OnInit {
  dataSource: MatTableDataSource<Course> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'codigo',
    'curso',
    'creditos',
    'tipo',
    'semestre',
    'universidad',
  ];
  constructor(private cS: CourseService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
