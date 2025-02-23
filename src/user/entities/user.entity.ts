import { PlanComposition } from 'src/plan-composition/entities/plan-composition.entity';
import { Professor } from 'src/professor/entities/professor.entity';
import { TrainingPlan } from 'src/training-plan/entities/training-plan.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  telephone: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  email: string;

  @ManyToOne(() => Professor, (professor) => professor.users) // Define the many-to-one relationship
  professor: Professor; // This will hold the professor associated with the user

  @Column({ nullable: true }) // Add a foreign key column to store the professor's ID
  professorId: number;

  /*@OneToMany(() => TrainingPlan, (trainingPlan) => trainingPlan.user) // One-to-many relationship with TrainingPlan
  trainingPlans: TrainingPlan[]; // Array of training plans associated with the user*/

  @OneToMany(() => PlanComposition, (planComposition) => planComposition.userId) // One-to-many relationship with PlanComposition
  planComposition: PlanComposition[]; // Array of training plans associated with the user
}
