import { ProfessorRole } from '../../professor/entities/professor-role.enum';

export interface ActiveUserData {
  //id of user
  sub: number;
  email: string;
  role: ProfessorRole;
}
