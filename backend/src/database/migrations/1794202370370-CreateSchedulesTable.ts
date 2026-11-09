import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchedulesTable1794202370370 implements MigrationInterface {
  name = 'CreateSchedulesTable1794202370370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."schedules" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "schedule_code" character varying(20) NOT NULL,
        CONSTRAINT "UQ_1a72adaf898e04bfbae78fa7aa9" UNIQUE ("schedule_code"),
        CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."schedules" ("schedule_code")
      VALUES
        ('5-Б-1'),
        ('2-А'),
        ('9'),
        ('2')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."schedules"
    `);
  }
}
