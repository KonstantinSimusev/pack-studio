import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamsTable1794201506798 implements MigrationInterface {
  name = 'CreateTeamsTable1794201506798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."teams" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "team_number" integer NOT NULL,
        CONSTRAINT "UQ_85092a191b583630c658639f32d" UNIQUE ("team_number"),
        CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "pack_studio_schema"."teams" ("team_number")
      VALUES
        (1),
        (2),
        (3),
        (4),
        (5)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."teams"
    `);
  }
}
