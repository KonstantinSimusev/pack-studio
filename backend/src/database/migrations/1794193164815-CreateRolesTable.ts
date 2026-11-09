import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1794193164815 implements MigrationInterface {
  name = 'CreateRolesTable1794193164815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."roles" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(50) NOT NULL,
        CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"),
        CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."roles" ("name")
      VALUES
        ('USER'),                          -- Пользователь
        ('ADMIN'),                         -- Администратор
        ('EXECUTIVE'),                     -- Директор
        ('HEAD_PRODUCTION'),               -- Начальник производства (в промышленности)
        ('SENIOR_MANAGER'),                -- Старший менеджер
        ('MECHANIC'),                      -- Механик
        ('POWER_ENGINEER'),                -- Энергетик
        ('LEAD_SAFETY'),                   -- Ведущий специалист по охране труда
        ('LEAD_ENGINEER'),                 -- Ведущий инженер
        ('LEAD_QUALITY'),                  -- Ведущий инженер по качеству
        ('SAFETY_SPECIALIST'),             -- Специалист по охране труда
        ('PRODUCTION_ENGINEER'),           -- Инженер по подготовке производства первой категории
        ('ADMIN_INSPECTOR'),               -- Инспектор-делопроизводитель
        ('WORK_DISTRIBUTOR'),              -- Распределитель работ
        ('LEAD_ECONOMIST'),                -- Ведущий экономист
        ('LEAD_LABOR_ENGINEER'),           -- Ведущий инженер по организации и нормированию труда
        ('LABOR_ENGINEER'),                -- Инженер по организации и нормированию труда первой категории
        ('LEAD_SPECIALIST'),               -- Ведущий специалист
        ('TECHNOLOGIST_LEAD'),             -- Ведущий инженер-технолог
        ('TECHNOLOGIST'),                  -- Инженер-технолог первой категории
        ('ENGINEER'),                      -- Инженер первой категории
        ('HEAD'),                          -- Начальник участка (в промышленности)
        ('LEAD_MASTER'),                   -- Старший мастер участка
        ('DETAIL_MASTER'),                 -- Мастер участка реквизитов
        ('MASTER'),                        -- Мастер участка
        ('LEAD_OPERATOR'),                 -- Оператор поста управления (старший)
        ('OPERATOR'),                      -- Оператор поста управления
        ('PRODUCTION_FOREMAN'),            -- Бригадир на участках основного производства
        ('PACKING_FOREMAN'),               -- Бригадир на отделке, сортировке, приёмке, сдаче, пакетировке и упаковке металла и готовой продукции
        ('PACKER'),                        -- Укладчик-упаковщик
        ('UNIT_PACKER'),                   -- Укладчик-упаковщик ЛУМ
        ('REPAIR_MECHANIC'),               -- Слесарь-ремонтник
        ('STACKER'),                       -- Штабелировщик металла
        ('STAMPER'),                       -- Штамповщик
        ('DRIVER'),                        -- Водитель погрузчика
        ('CUTTER'),                        -- Резчик холодного металла
        ('GAS_CUTTER'),                    -- Газорезчик
        ('CRANE_OPERATOR'),                -- Машинист крана
        ('LEAD_AUTOMATION'),               -- Ведущий инженер по автоматизации и механизации производственных процессов
        ('ELECTRICIAN'),                   -- Электромонтёр по ремонту и обслуживанию электрооборудования
        ('MATERIAL_FOREMAN'),              -- Бригадир по перемещению сырья, полуфабрикатов и готовой продукции в процессе производства
        ('CAR_DRIVER'),                    -- Водитель автомобиля
        ('SENIOR_WAREHOUSEMAN'),           -- Кладовщик (старший)
        ('WAREHOUSEMAN')                   -- Кладовщик
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."roles"
    `);
  }
}
