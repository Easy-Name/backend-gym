import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TrainingPlanStatus } from './training-plan-status.enum';

@Entity()
export class TrainingPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' }) // Start date of the training plan
  startDate: Date;

  @Column({ type: 'date' }) // End date of the training plan
  endDate: Date;

  @Column({
    type: 'enum',
    enum: TrainingPlanStatus,
    default: TrainingPlanStatus.INACTIVE,
  })
  status: TrainingPlanStatus;

  @Column({ type: 'smallint', nullable: false }) // Days of the training plan
  days: number;

  @ManyToOne(() => User, (user) => user.trainingPlans) // Many-to-one relationship with User
  @JoinColumn({ name: 'userId' }) // Foreign key column
  user: User;

  @Column({ nullable: false }) // Foreign key to the User entity
  userId: number;
}
