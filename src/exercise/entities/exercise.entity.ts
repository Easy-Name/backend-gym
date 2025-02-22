import { PlanComposition } from 'src/plan-composition/entities/plan-composition.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  exerciseName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  targetBodyPart: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  exerciseVideoLink?: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  officialExercise: boolean;

  @OneToMany(
    () => PlanComposition,
    (planComposition) => planComposition.exercise,
  )
  planCompositions: PlanComposition[];
}
