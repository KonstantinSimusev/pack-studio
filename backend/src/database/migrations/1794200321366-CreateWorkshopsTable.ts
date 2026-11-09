import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkshopsTable1794200321366 implements MigrationInterface {
  name = 'CreateWorkshopsTable1794200321366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."workshops" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "workshop_code" character varying(100) NOT NULL,
        CONSTRAINT "UQ_43a3dcc06a838a398e203c8d40f" UNIQUE ("workshop_code"),
        CONSTRAINT "PK_6d0e82a124f5b53df91c8989848" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."workshops" ("workshop_code")
      VALUES
        ('Управление'),
        ('ЛПЦ-4'),
        ('ЛПЦ-5'),
        ('ЛПЦ-8 (участок гнутого профиля)'),
        ('ЛПЦ-8 (участок ленты)'),
        ('ЛПЦ-10'),
        ('ЛПЦ-11'),
        ('ПМП (южный блок)'),
        ('ПМП (северный блок)')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."workshops"
    `);
  }
}
