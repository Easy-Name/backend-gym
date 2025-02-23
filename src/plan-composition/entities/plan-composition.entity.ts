import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainingPlan } from '../../training-plan/entities/training-plan.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { PlanCompositionStatus } from './plan-composition-status.enum';

@Entity()
@Unique(['userId', 'exerciseId', 'day']) // Composite unique constraint
export class PlanComposition {
  @PrimaryGeneratedColumn()
  id: number;

  /*@Column({ type: 'int', nullable: false }) // Foreign key to TrainingPlan
  trainingPlanId: number;*/

  @Column({ type: 'int', nullable: false }) // Foreign key to Exercise
  exerciseId: number;

  @Column({ type: 'int', nullable: false }) // Foreign key to User
  userId: number;

  @Column({ type: 'smallint', nullable: false }) // Number of sets
  numberOfSets: number;

  @Column({ type: 'smallint', nullable: false }) // Number of repetitions
  numberOfRepetitions: number;

  @Column({ type: 'text', nullable: true }) // Observations (optional)
  observations: string;

  @Column({ type: 'varchar', length: 1, nullable: false }) // Day (A, B, C, etc.)
  day: string;

  @Column({ type: 'date', nullable: true }) // Start date of the training plan
  startDate: Date;

  @Column({ type: 'date', nullable: true }) // End date of the training plan
  endDate: Date;

  @Column({
    type: 'enum',
    enum: PlanCompositionStatus,
    default: PlanCompositionStatus.ACTIVE,
  })
  status: string;

  // Many-to-one relationship with User
  @ManyToOne(() => User, (user) => user.planComposition)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Many-to-one relationship with Exercise
  @ManyToOne(() => Exercise, (exercise) => exercise.planCompositions)
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;
}
