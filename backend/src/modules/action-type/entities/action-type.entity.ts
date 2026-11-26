import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EmployeeProduct } from '../../employee-product/entities/employee-product.entity';

@Entity({
  name: 'action-types',
})
export class ActionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'action_code',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  actionCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  // Связь: один цех — много сотрудников
  @OneToMany(
    () => EmployeeProduct,
    (employeeProduct) => employeeProduct.actionType,
  )
  employeeProducts: EmployeeProduct[];
}
