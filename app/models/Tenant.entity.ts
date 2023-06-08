import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";



@Entity("shared_tenant")
export default class TenantEntity {
  /*
  *Tenant model , this is equivalent to an organization or BU unit
  */
  
  @Column()
  name: string;
  
  @Column()
  is_active: boolean;
  
  @Column()
  expiry_date: string;
  
  @PrimaryGeneratedColumn()
  id: number;
  
}
