import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountsTable1794192598175 implements MigrationInterface {
  name = 'CreateAccountsTable1794192598175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pack_studio_schema"."accounts" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "login" character varying(255) NOT NULL,
        "hashed_password" character varying(512) NOT NULL,
        "hashed_refresh_token" character varying(512),
        CONSTRAINT "UQ_2b995c673f59534efe164ced42d" UNIQUE ("login"),
        CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
      )   
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "pack_studio_schema"."accounts"
    `);
  }
}
