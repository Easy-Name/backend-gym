import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  exerciseName: string;

  @Column({ type: 'varchar', length: 96, nullable: false })
  targetBodyPart: string;

  @Column({ type: 'varchar', length: 96, nullable: true })
  exerciseVideoLink: string;
}
