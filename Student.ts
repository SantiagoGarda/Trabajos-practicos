import { Person } from "./Person";
import { EnumSubjects } from "./Enum";
import { Subject } from "./Subjects";
import { Teacher } from "./Teacher";


export class Student implements Person{
    name: string;
    lastName: string;
    id: number;
    birthDate: string;
    numPhone: number;
    address: string;
    email: string;
    numFile: number;
    startDate: string;
    subjects:Subject[] ;
    average: number;

    constructor(name: string, lastName: string, id: number, birthDate: string, numPhone: number, address: string, email: string, numFile:number, subjects:Subject[] ) {
        this.name= name;
        this.lastName= lastName;
        this.id= id;
        this.birthDate= new Date(birthDate).toLocaleDateString();
        this.numPhone= numPhone;
        this.address= address;
        this.email= email;
        this.numFile= numFile;
        this.startDate= new Date().toLocaleDateString();   
        this.subjects= subjects;
        this.average=Number(this.calculateAverage());
} 
addSubjects(name:string, grade: number, teacher: string){
    let subject= new Subject(name, grade, teacher);
    this.subjects.push(subject);
   
}

calculateAverage(){

    const sum = this.subjects.reduce((acc, subject) => acc + subject.grade, 0);
    this.average = sum / this.subjects.length;
    return this.average  
   
}
}