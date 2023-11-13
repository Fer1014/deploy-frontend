import { University } from "./university"

export class Course{
    idCourse:number=0
    nameCourse:string=""
    creditsCourse:number=0
    typeCourse:string=""
    semesterCourse:number=0
    university:University=new University()
}