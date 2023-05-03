import { EnumSubjects } from "./Enum"
import { Teacher } from "./Teacher";

export class Subject  {
    name: string;
    grade: number;
    teacher: string;

    constructor( name: string,grade: number, teacher: string){
        this.name= name;
        this.grade= grade;
        this.teacher= teacher;
    }

}