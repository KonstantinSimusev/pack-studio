import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeesTable1794207258714 implements MigrationInterface {
  name = 'CreateEmployeesTable1794207258714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."employees" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "last_name" character varying(50) NOT NULL,
        "first_name" character varying(50) NOT NULL,
        "patronymic" character varying(50) NOT NULL,
        "personal_number" integer NOT NULL,
        "birth_day" date NOT NULL,
        "start_date" date NOT NULL,
        "end_date" date,
        "has_access" boolean NOT NULL DEFAULT true,
        "is_active" boolean NOT NULL DEFAULT true,
        "account_id" uuid,
        "team_id" uuid,
        "position_id" uuid,
        "profile_team_id" uuid,
        "profile_position_id" uuid,
        CONSTRAINT "UQ_dc6bca444650b4fd3fed011a3ba" UNIQUE ("personal_number"),
        CONSTRAINT "REL_8d40590e5c06e521ed077552c4" UNIQUE ("account_id"),
        CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        ADD CONSTRAINT "FK_8d40590e5c06e521ed077552c42"
        FOREIGN KEY ("account_id") REFERENCES "pack_studio_schema"."accounts"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        ADD CONSTRAINT "FK_93a9cbef80993a39415d94b310b"
        FOREIGN KEY ("team_id") REFERENCES "pack_studio_schema"."teams"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"
        FOREIGN KEY ("position_id") REFERENCES "pack_studio_schema"."positions"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        ADD CONSTRAINT "FK_72b1dd7e7d5a9e474ceb52ec165"
        FOREIGN KEY ("profile_team_id") REFERENCES "pack_studio_schema"."teams"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        ADD CONSTRAINT "FK_e3e96476474b5d796c33c986228"
        FOREIGN KEY ("profile_position_id") REFERENCES "pack_studio_schema"."positions"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        DROP CONSTRAINT "FK_e3e96476474b5d796c33c986228"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        DROP CONSTRAINT "FK_72b1dd7e7d5a9e474ceb52ec165"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        DROP CONSTRAINT "FK_93a9cbef80993a39415d94b310b"
    `);

    await queryRunner.query(`
      ALTER TABLE "pack_studio_schema"."employees"
        DROP CONSTRAINT "FK_8d40590e5c06e521ed077552c42"
    `);

    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."employees"
    `);
  }
}
