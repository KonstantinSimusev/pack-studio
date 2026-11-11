import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1794422064958 implements MigrationInterface {
    name = 'InitSchema1794422064958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "login" character varying(255) NOT NULL, "hashed_password" character varying(512) NOT NULL, "hashed_refresh_token" character varying(512), CONSTRAINT "UQ_2b995c673f59534efe164ced42d" UNIQUE ("login"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."schedules" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "schedule_code" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_1a72adaf898e04bfbae78fa7aa9" UNIQUE ("schedule_code"), CONSTRAINT "UQ_758daa8476fd77ea422efacf7b9" UNIQUE ("name"), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."teams" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "team_number" integer NOT NULL, CONSTRAINT "UQ_85092a191b583630c658639f32d" UNIQUE ("team_number"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."employees" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "patronymic" character varying(50) NOT NULL, "personal_number" integer NOT NULL, "account_id" uuid, "home_workshop_id" uuid, "home_team_id" uuid, "home_profession_id" uuid, "home_schedule_id" uuid, CONSTRAINT "UQ_dc6bca444650b4fd3fed011a3ba" UNIQUE ("personal_number"), CONSTRAINT "REL_8d40590e5c06e521ed077552c4" UNIQUE ("account_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."professions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "profession_code" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_af7fd95fb12c57564b76e8fd826" UNIQUE ("profession_code"), CONSTRAINT "UQ_b273de78f494fa9da6952ffa703" UNIQUE ("name"), CONSTRAINT "PK_9247c0d4b30fc6b796d59262058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."assignments" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "is_active" boolean NOT NULL DEFAULT true, "employee_id" uuid, "current_workshop_id" uuid, "current_team_id" uuid, "current_profession_id" uuid, "current_schedule_id" uuid, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."workshops" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "workshop_code" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_43a3dcc06a838a398e203c8d40f" UNIQUE ("workshop_code"), CONSTRAINT "UQ_84a8c763773a6482ba066f608c3" UNIQUE ("name"), CONSTRAINT "PK_6d0e82a124f5b53df91c8989848" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_8d40590e5c06e521ed077552c42" FOREIGN KEY ("account_id") REFERENCES "pack_studio_schema"."accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_a65b1cf6b00a04644153c1057cd" FOREIGN KEY ("home_workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_43ed700acdfde248ec69aaa36f5" FOREIGN KEY ("home_team_id") REFERENCES "pack_studio_schema"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_21db35e24758ba1b6993d39437d" FOREIGN KEY ("home_profession_id") REFERENCES "pack_studio_schema"."professions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_e414c8fb4bb615898c635ecac63" FOREIGN KEY ("home_schedule_id") REFERENCES "pack_studio_schema"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" ADD CONSTRAINT "FK_bc4eb0a747d8a219de81111f379" FOREIGN KEY ("employee_id") REFERENCES "pack_studio_schema"."employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" ADD CONSTRAINT "FK_3a97bebdbfccbb71f6089d608ef" FOREIGN KEY ("current_workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" ADD CONSTRAINT "FK_e37143e71c1fcea0109e254c0f8" FOREIGN KEY ("current_team_id") REFERENCES "pack_studio_schema"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" ADD CONSTRAINT "FK_ff71da6ca94c80c9b2efd902aa2" FOREIGN KEY ("current_profession_id") REFERENCES "pack_studio_schema"."professions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" ADD CONSTRAINT "FK_566f5c2eb22b819563a7623bc3c" FOREIGN KEY ("current_schedule_id") REFERENCES "pack_studio_schema"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" DROP CONSTRAINT "FK_566f5c2eb22b819563a7623bc3c"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" DROP CONSTRAINT "FK_ff71da6ca94c80c9b2efd902aa2"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" DROP CONSTRAINT "FK_e37143e71c1fcea0109e254c0f8"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" DROP CONSTRAINT "FK_3a97bebdbfccbb71f6089d608ef"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."assignments" DROP CONSTRAINT "FK_bc4eb0a747d8a219de81111f379"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_e414c8fb4bb615898c635ecac63"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_21db35e24758ba1b6993d39437d"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_43ed700acdfde248ec69aaa36f5"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_a65b1cf6b00a04644153c1057cd"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_8d40590e5c06e521ed077552c42"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."workshops"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."assignments"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."professions"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."employees"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."teams"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."schedules"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."accounts"`);
    }

}
