import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { Subject } from "./Subjects";
import { EnumSubjects } from "./Enum";
import { SchoolManager } from "./SchoolManager";
import fs from "fs";
import readLineSync, { keyIn } from "readline-sync";

let manager = new SchoolManager; 

manager.selectMenu() //Menu con todas las opciones

//manager.setEnrollStudent();//Agregar alumno
//manager.hireTeacher();//Agregar profesor
//manager.expelStudent();//Expulsar/desvincular Alumno
//manager.fireTeacher();//Despedir/desvincular Docente
manager.editPerson();// Editar Alumno/Docente opcion tres datos(telefono,direccion,e-mail)
//manager.consultLists()// Consulta listado completo Docente/Alumno
//manager.consultPerson()//Consultar datos Docente/Alumno
//manager.listTeacherByStudent()// Consulta todos los Docente que tiene un Alumno
//manager.listStudentByTeacher()// consulta todos los Alumnos que tiene un Docente
//manager.averageStudents() // Listado de todos los Alumnos con sus Promedios