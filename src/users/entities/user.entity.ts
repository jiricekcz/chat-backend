import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    username: string;
}