import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorRole } from './professor-role.enum';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  telephone: string;

  @Column({ type: 'varchar', length: 96, nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 64, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ProfessorRole,
    default: ProfessorRole.USER, // Default role is "user"
  })
  @Exclude()
  role: ProfessorRole;

  @OneToMany(() => User, (user) => user.professor) // Define the one-to-many relationship
  users: User[]; // This will hold the array of users associated with the professor
}
