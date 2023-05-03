import { Person } from "./Person";
import { EnumSubjects } from "./Enum";

export class Teacher implements Person{
   name: string;
    lastName: string;
    id: number;
    birthDate: string;
    numPhone: number;
    address: string;
    email: string;
    numFile: number;
    startDate: string;
    
    subject: EnumSubjects;   

    constructor(name: string, lastName: string, id: number, birthDate: string, numPhone: number, address: string, email: string, numFile: number, subject: EnumSubjects) {
      this.name= name;
      this.lastName= lastName;
      this.id= id;
      this.birthDate= new Date(birthDate).toLocaleDateString();
      this.numPhone= numPhone;
      this.address= address;
      this.email= email;
      this.numFile= numFile;
      this.startDate= new Date().toLocaleDateString();   
      
      
      this.subject= subject;
      
    }
}