import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePositionsTable1794203364656 implements MigrationInterface {
  name = 'CreatePositionsTable1794203364656';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."positions" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "position_code" integer NOT NULL,
        "workshop_id" uuid,
        "profession_id" uuid,
        "schedule_id" uuid,
        "role_id" uuid,
        CONSTRAINT "UQ_51d14068176b10b853627454ba9" UNIQUE ("position_code"),
        CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        ADD CONSTRAINT "FK_f71e2c5605f07c25b243576f1c2"
        FOREIGN KEY ("workshop_id") REFERENCES "pack_studio_schema"."workshops"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        ADD CONSTRAINT "FK_3ad53de38c1240baaa04e2867c2"
        FOREIGN KEY ("profession_id") REFERENCES "pack_studio_schema"."professions"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        ADD CONSTRAINT "FK_7ebfe4b2017cf273936dc1eed6c"
        FOREIGN KEY ("schedule_id") REFERENCES "pack_studio_schema"."schedules"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        ADD CONSTRAINT "FK_91cdc9bb5a3821e7dff7bef8d7c"
        FOREIGN KEY ("role_id") REFERENCES "pack_studio_schema"."roles"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."positions"
        ("position_code", "workshop_id", "profession_id", "schedule_id", "role_id")
      VALUES
        (643842,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'HEAD'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'HEAD')),
        (643850,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'DETAIL_MASTER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'DETAIL_MASTER')),
        (643843,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'MASTER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'MASTER')),
        (643852,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'PRODUCTION_FOREMAN'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'PRODUCTION_FOREMAN')),
        (643853,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'PRODUCTION_FOREMAN'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'PRODUCTION_FOREMAN')),
        (643847,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'LEAD_OPERATOR'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'LEAD_OPERATOR')),
        (643848,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'OPERATOR'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'OPERATOR')),
        (643985,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'PACKING_FOREMAN'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'PACKING_FOREMAN')),
        (643984,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'PACKING_FOREMAN'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'PACKING_FOREMAN')),
        (643854,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'DRIVER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '5-Б-1'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'DRIVER')),
        (643856,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'DRIVER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'DRIVER')),
        (643844,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'PACKER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'PACKER')),
        (643849,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'UNIT_PACKER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'UNIT_PACKER')),
        (643845,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'STACKER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'STACKER')),
        (643857,
          (SELECT "id" FROM "pack_studio_schema"."workshops" WHERE "workshop_code" = 'ЛПЦ-11'),
          (SELECT "id" FROM "pack_studio_schema"."professions" WHERE "profession_code" = 'CUTTER'),
          (SELECT "id" FROM "pack_studio_schema"."schedules" WHERE "schedule_code" = '2-А'),
          (SELECT "id" FROM "pack_studio_schema"."roles" WHERE "name" = 'CUTTER'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        DROP CONSTRAINT "FK_91cdc9bb5a3821e7dff7bef8d7c"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        DROP CONSTRAINT "FK_7ebfe4b2017cf273936dc1eed6c"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        DROP CONSTRAINT "FK_3ad53de38c1240baaa04e2867c2"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."positions"
        DROP CONSTRAINT "FK_f71e2c5605f07c25b243576f1c2"
    `);

    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."positions"
    `);
  }
}
