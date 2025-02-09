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

@Entity()
@Unique(['trainingPlanId', 'exerciseId', 'day']) // Composite unique constraint
export class PlanComposition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false }) // Foreign key to TrainingPlan
  trainingPlanId: number;

  @Column({ type: 'int', nullable: false }) // Foreign key to Exercise
  exerciseId: number;

  @Column({ type: 'smallint', nullable: false }) // Number of sets
  numberOfSets: number;

  @Column({ type: 'smallint', nullable: false }) // Number of repetitions
  numberOfRepetitions: number;

  @Column({ type: 'text', nullable: true }) // Observations (optional)
  observations: string;

  @Column({ type: 'varchar', length: 1, nullable: false }) // Day (A, B, C, etc.)
  day: string;

  // Many-to-one relationship with TrainingPlan
  @ManyToOne(
    () => TrainingPlan,
    (trainingPlan) => trainingPlan.planCompositions,
  )
  @JoinColumn({ name: 'trainingPlanId' })
  trainingPlan: TrainingPlan;

  // Many-to-one relationship with Exercise
  @ManyToOne(() => Exercise, (exercise) => exercise.planCompositions)
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;
}
