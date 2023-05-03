import { Person } from "./Person";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { Subject } from "./Subjects";
import { EnumSubjects } from "./Enum";
import fs, { readlinkSync } from "fs";
import readLineSync, { keyIn } from "readline-sync";
import { removeAllListeners } from "process";

export class SchoolManager {


  constructor() {

    if (fs.existsSync("./students.json")) {
      console.log("Listado de alumnos cargado en el sistema");
    } else {
      fs.writeFileSync("./students.json", "[]", "utf-8");
    }
    if (fs.existsSync("./teachers.json")) {
      console.log("Listado de profesores cargado en el sistema");
    } else {
      fs.writeFileSync("./teachers.json", "[]", "utf-8")
    }
  }
  dataStudents() {
    return JSON.parse(fs.readFileSync("./students.json", "utf-8"));
  }
  dataTeachers() {
    return JSON.parse(fs.readFileSync("./teachers.json", "utf-8"));
  }

  setEnrollStudent() {
    let name = readLineSync
      .question("Ingrese nombre del Alumno:-->")
      .toLowerCase();
    let lastName = readLineSync
      .question("Ingrese apellido del Alumno:-->")
      .toLowerCase();
    let id = Number(
      readLineSync.question("Ingrese DNI (sin punto) del Alumno:-->")
    );
    let birthDate = readLineSync.question(
      "Ingrese fecha de nacimiento del Alumno (ano-mes-dia):-->"
    );
    let numPhone = Number(
      readLineSync.question(
        "Ingrese numero de telefono Alumno, Madre, Padre o Tutor:-->"
      )
    );
    let address = readLineSync
      .question("Ingrese direccion del Alumno:-->")
      .toLowerCase();
    let email = readLineSync
      .question("Ingrese email del Alumno, Madre, Padre, o Tutor:-->")
      .toLowerCase();
    let numFile = this.dataStudents().length + 1;

    let newStudent = new Student(
      name,
      lastName,
      id,
      birthDate,
      numPhone,
      address,
      email,
      numFile,
      []
    );
    let amountSubject = Number(
      readLineSync.question("¿A cuantas meterias se quiere anotar?")
    );
    for (let i = 1; i <= amountSubject; i++) {
      let listSubjects = [
        "matematica",
        "lengua",
        "sociales",
        "naturales",
        "ingles",
        "ed.fisica",
      ];
      let addSubject = readLineSync.keyInSelect(
        listSubjects,
        "Selecione Materia"
      );
      let subject = listSubjects[addSubject];
      let listGrade = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      let addGrade = readLineSync.keyInSelect(listGrade, "Selecione nota");
      let grade = Number(listGrade[addGrade]);
      let listTeacher = [
        "Prof. Mat. Miriam Di Carlo",
        "Prof. Leng. Maria Manna ",
        "Prof. Soc. Patricia Rojas",
        "Prof. Nat. Claudia Perez",
        "Prof. Ing. Julieta Kesler",
        "Prof. Edu. Gustavo Poffer",
      ];
      let addTeacher = readLineSync.keyInSelect(
        listTeacher,
        "Selecione Profesor"
      );
      let teacher = listTeacher[addTeacher];
      newStudent.addSubjects(subject, grade, teacher);
    }

    newStudent.calculateAverage();

    let students = [...this.dataStudents(), newStudent];
    fs.writeFileSync("./students.json", JSON.stringify(students, null, 2));
  }
  hireTeacher() {
    let name = readLineSync
      .question("Ingrese nombre del Profesor:-->")
      .toLowerCase();
    let lastName = readLineSync
      .question("Ingrese apellido del Profesor:-->")
      .toLowerCase();
    let id = Number(
      readLineSync.question("Ingrese DNI (sin punto) del Profesor:-->")
    );
    let birthDate = readLineSync.question(
      "Ingrese fecha de nacimiento del Profesor (ano-mes-dia):-->"
    );
    let numPhone = Number(
      readLineSync.question("Ingrese numero de telefono Pofesor:-->")
    );
    let address = readLineSync
      .question("Ingrese direccion del Profesor:-->")
      .toLowerCase();
    let email = readLineSync
      .question("Ingrese email del Profesor:-->")
      .toLowerCase();
    let numFile = this.dataTeachers().length + 1;
    let listSubjects = Object.values(EnumSubjects);
    let addSubject = readLineSync.keyInSelect(
      listSubjects,
      "¿Que materia dicta?"
    );
    let subject = listSubjects[addSubject];
    let newTeacher = new Teacher(
      name,
      lastName,
      id,
      birthDate,
      numPhone,
      address,
      email,
      numFile,
      subject
    );
    let teachers = [...this.dataTeachers(), newTeacher];
    fs.writeFileSync("./teachers.json", JSON.stringify(teachers, null, 2));
  }

  expelStudent(
    id = Number(readLineSync.question("Ingrese DNI (sin punto) del Alumno:-->"))
  ) {
    let listStudent = this.dataStudents();
    let deleteStudent = listStudent.findIndex((listStudent: { id: number }) => listStudent.id === id);

    if (deleteStudent >= 0) {
      listStudent.splice(deleteStudent, 1);
      console.log(`El alumno ${id}  fue expulsado`);
    } else {
      console.log(`El alumno ${id} } no fue encontrado en el listado`);
    }
    fs.writeFileSync("./students.json", JSON.stringify(listStudent));
  }

  fireTeacher(
    id = Number(
      readLineSync.question("Ingrese DNI (sin punto) del Profesor:-->")
    )
  ) {
    let listTeacher = this.dataTeachers();
    let deleteTeacher = listTeacher.findIndex((listTeacher: { id: number }) => listTeacher.id === id);
    if (deleteTeacher >= 0) {
      listTeacher.splice(deleteTeacher, 1);
      console.log(`El docente ${id} fue despedido`);
    } else {
      console.log(`El docente ${id} no fue encontrado en el listado`);
    }
    fs.writeFileSync("./teachers.json", JSON.stringify(listTeacher));
  }

  editPerson(
    id = Number(readLineSync.question("Ingrese DNI de la Persona a modificar:-->"))) {
    let listTeacher = this.dataTeachers();
    let listStudent = this.dataStudents();
    let personStudent = listStudent.findIndex(
      (listStudent: { id: number }) => listStudent.id === id
    );
    let personTeacher = listTeacher.findIndex((listTeacher: { id: number }) => listTeacher.id === id);
    if (personStudent >= 0) {
      let student = listStudent[personStudent];
      console.log(`va a modificar los datos de ${student.name}`);
      let listEdit = ["numPhone", "address", "email"]
      let edit = readLineSync.keyInSelect(listEdit, "que desea modificar?:-->");
      let dateEdit = listEdit[edit];

      switch (dateEdit) {
        case "numPhone": student.numPhone = readLineSync.question("modifique numero de telefono del alumno:-->").toLowerCase();
          break;
        case "address": student.address = readLineSync.question("modifique la direccion del alumno:-->").toLowerCase();
          break;
          case "email":student.email=readLineSync.question("modifique el e-mail del alumno:-->").toLowerCase();
          break;
        default:
           console.log("no ingreso ninguna opcion");
        }

      fs.writeFileSync("./students.json", JSON.stringify(listStudent));

    }
    else if (personTeacher >= 0) {
      let teacher = listTeacher[personTeacher]
      console.log(`va a modificar los datos de ${teacher.name}`);
      let listEdit = ["numPhone", "address", "email"]
      let edit = readLineSync.keyInSelect(listEdit, "que desea modificar?:-->")
      let dateEdit = listEdit[edit];
      switch (dateEdit) {
        case "numPhone": teacher.numPhone = readLineSync.question("modifique numero de telefono del alumno:-->").toLowerCase();
          break;
        case "address": teacher.address = readLineSync.question("modifique la direccion del alumno:-->").toLowerCase();
          break;
        case "email": teacher.email = readLineSync.question("modifique el email del alumno:-->").toLowerCase();
          break;

      }
      fs.writeFileSync("./teachers.json", JSON.stringify(listTeacher))
    }
    else {
      console.log("no se encontro a la persona, vuelva a ingresar el dni:-->");
    }
  }

  consultLists(search = (readLineSync.question("ingrese el listado que desea ver: Alumnos o Profesores:-->"))) {
    if (search === "Alumnos") {
      let listStudent = this.dataStudents();
      console.log("listado de alumnos:");
      for (let i = 0; i < listStudent.length; i++) {
        console.log(listStudent[i]);
      }
    }

    else if (search === "Profesores") {
      let listTeacher = this.dataTeachers();
      console.log("listado de profesores: ", listTeacher);

    }
    else {
      console.log(`listado de ${search} no encontrado`);

    }

  }

  consultPerson(id = Number(readLineSync.question("Ingrese el DNI de la persona que busca:-->"))) {
    let listStudent = this.dataStudents();
    let listTeacher = this.dataTeachers();

    let personStudent = listStudent.findIndex((listStudent: { id: number }) => listStudent.id === id);
    let personTeacher = listTeacher.findIndex((listTeacher: { id: number }) => listTeacher.id === id);
    if (personStudent >= 0) {
      let student = listStudent[personStudent];

      console.log("el alumno", student)
    }
    else if (personTeacher >= 0) {
      let teacher = listTeacher[personTeacher];
      console.log(teacher.name, teacher.lastName, "materia", teacher.subject);

    }
    else {
      console.log("no se encontro a la persona buscada");
    }
  }
  listTeacherByStudent(id = Number(readLineSync.question("Ingrese DNI del Alumno:--> "))) {

    let listStudents = this.dataStudents();
    let personStudent = listStudents.find((listStudents: { id: number }) => listStudents.id === id);

    let teachers: string[] = personStudent.subjects.map((subject: { teacher: string }) => subject.teacher);
    console.log("Los Profesores de  ", personStudent.name, " son ", teachers);

  }
  listStudentByTeacher(id = Number(readLineSync.question("ingrese el DNI del Docente:-->"))) {
    let listStudents = this.dataStudents();
    let listTeachers = this.dataTeachers();
    let personTeacher = listTeachers.find((listTeacher: { id: number }) => listTeacher.id === id);
    let subjectTeacher: string = personTeacher.subject;

    let listTeacherStudents = listStudents.filter((student: { subjects: { name: string }[]; }) => {
      return student.subjects.some((subject: { name: string }) => {
        return subject.name === subjectTeacher
      });
    });
    console.log("Materia", subjectTeacher);
    let students: string[] = []
    for (let i = 0; i < listTeacherStudents.length; i++) {
      students.push(listTeacherStudents[i].name)
    }

    console.log("Los alumnos del docente ", personTeacher.name, personTeacher.lastName, "son: ", students);

  }

  averageStudents() {
    this.dataStudents().forEach((persona: any) => {
      console.log(`Nombre: ${persona.name},  Apellido:${persona.lastName},  Promedio: ${persona.average}`)
      return persona.name, persona.lastName, persona.average
    });
  }
  selectMenu() {
    console.log("Bienvenido a ingresado al sistema de Gestor Escolar");
    console.log("Por favor, marque la opcion deseada en el listado, o bien marque 0 (CANCEL) si desea salir del sistema");
    let options = ["Inscribir Alumno", "Contratar Docente", "Expulsar Alumno", "Despedir Docente", "Editar Dato Alumno/Docente", "Consultar Lista Alumno/Docente", "Consultar dato de Persona", "Listado de Alumno con Docentes", "Listado de Docente con Alumnos", "Listado de Alumnos con Promedios"];
    let optionSelect = readLineSync.keyInSelect(options, "Marque la opcion deseada en el listado");

    let option = options[optionSelect]
    while ((optionSelect + 1) !== 0) {
      switch (option) {
        case "Inscribir Alumno":
          console.log("opcion inscribir un Alumno, Ingrese los datos que se piden debajo");
          this.setEnrollStudent();
          break;
        case "Contratar Docente":
          console.log("opcion contratar un docente, Ingrese los datos que se piden debajo");
          this.hireTeacher();
          break;
        case "Expulsar Alumno":
          console.log("Ingrese DNI para expulsar Alumno");
          this.expelStudent()
          break;
        case "Despedir Docente":
          console.log("Ingrese DNI para desvincular Docente");
          this.fireTeacher()
          break;
        case "Editar Dato Alumno/Docente":
          console.log("editar");
          this.editPerson()
          break;
        case "Consultar Lista Alumno/Docente":
          console.log("listado de alumnos/Docente");
          this.consultLists()
          break;
        case "Consultar dato de Persona":
          console.log("dato de Persona que busco");
          this.consultPerson()
          break;
        case "Listado de Alumno con Docentes":
          console.log("Listado de Alumnos con sus docentes");
          this.listStudentByTeacher()
          break;
        case "Listado de Docente con Alumnos":
          console.log("listado de Docentes con sus Alumnos");
          this.listTeacherByStudent()
          break;
        case "Listado de Alumnos con Promedios":
          console.log("Promedios de Alumnos");
          this.averageStudents()
          break;
        default:
          console.log("salio del sistema.");
      }
      optionSelect = readLineSync.keyInSelect(options, "Marque otra opcion para operar: ");
      option = options[optionSelect]
    }
    console.clear();
    console.log("usted salio del sistema");



  }

}   