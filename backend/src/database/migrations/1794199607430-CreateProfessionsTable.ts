import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfessionsTable1794199607430 implements MigrationInterface {
  name = 'CreateProfessionsTable1794199607430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."professions" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "profession_code" character varying(100) NOT NULL,
        "name" character varying(255) NOT NULL,
        CONSTRAINT "UQ_af7fd95fb12c57564b76e8fd826" UNIQUE ("profession_code"),
        CONSTRAINT "UQ_b273de78f494fa9da6952ffa703" UNIQUE ("name"),
        CONSTRAINT "PK_9247c0d4b30fc6b796d59262058" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."professions" ("profession_code", "name")
      VALUES
        ('EXECUTIVE', 'Директор'),
        ('HEAD_PRODUCTION', 'Начальник производства (в промышленности)'),
        ('SENIOR_MANAGER', 'Старший менеджер'),
        ('MECHANIC', 'Механик'),
        ('POWER_ENGINEER', 'Энергетик'),
        ('LEAD_SAFETY', 'Ведущий специалист по охране труда'),
        ('LEAD_ENGINEER', 'Ведущий инженер'),
        ('LEAD_QUALITY', 'Ведущий инженер по качеству'),
        ('SAFETY_SPECIALIST', 'Специалист по охране труда'),
        ('PRODUCTION_ENGINEER', 'Инженер по подготовке производства первой категории'),
        ('ADMIN_INSPECTOR', 'Инспектор-делопроизводитель'),
        ('WORK_DISTRIBUTOR', 'Распределитель работ'),
        ('LEAD_ECONOMIST', 'Ведущий экономист'),
        ('LEAD_LABOR_ENGINEER', 'Ведущий инженер по организации и нормированию труда'),
        ('LABOR_ENGINEER', 'Инженер по организации и нормированию труда первой категории'),
        ('LEAD_SPECIALIST', 'Ведущий специалист'),
        ('TECHNOLOGIST_LEAD', 'Ведущий инженер-технолог'),
        ('TECHNOLOGIST', 'Инженер-технолог первой категории'),
        ('ENGINEER', 'Инженер первой категории'),
        ('HEAD', 'Начальник участка (в промышленности)'),
        ('MASTER', 'Мастер участка'),
        ('LEAD_MASTER', 'Старший мастер участка'),
        ('DETAIL_MASTER', 'Мастер участка реквизитов'),
        ('PRODUCTION_FOREMAN', 'Бригадир на участках основного производства'),
        ('PACKING_FOREMAN', 'Бригадир на отделке, сортировке, приёмке, сдаче, пакетировке и упаковке металла и готовой продукции'),
        ('PACKER', 'Укладчик-упаковщик'),
        ('UNIT_PACKER', 'Укладчик-упаковщик ЛУМ'),
        ('PACKER_APR8', 'Укладчик-упаковщик АПР-8'),
        ('REPAIR_MECHANIC', 'Слесарь-ремонтник'),
        ('STACKER', 'Штабелировщик металла'),
        ('STAMPER', 'Штамповщик'),
        ('DRIVER', 'Водитель погрузчика'),
        ('CUTTER', 'Резчик холодного металла'),
        ('GAS_CUTTER', 'Газорезчик'),
        ('CRANE_OPERATOR', 'Машинист крана'),
        ('LEAD_AUTOMATION', 'Ведущий инженер по автоматизации и механизации производственных процессов'),
        ('LEAD_OPERATOR', 'Оператор поста управления (старший)'),
        ('OPERATOR', 'Оператор поста управления'),
        ('ELECTRICIAN', 'Электромонтёр по ремонту и обслуживанию электрооборудования'),
        ('MATERIAL_FOREMAN', 'Бригадир по перемещению сырья, полуфабрикатов и готовой продукции в процессе производства'),
        ('CAR_DRIVER', 'Водитель автомобиля'),
        ('SENIOR_WAREHOUSEMAN', 'Кладовщик (старший)'),
        ('WAREHOUSEMAN', 'Кладовщик')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."professions"
    `);
  }
}
