import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1795248791678 implements MigrationInterface {
    name = 'InitMigration1795248791678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "login" character varying(255) NOT NULL, "hashed_password" character varying(512) NOT NULL, "hashed_refresh_token" character varying(512), CONSTRAINT "UQ_2b995c673f59534efe164ced42d" UNIQUE ("login"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."attendance_types" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "attendance_code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_021dacc1b22a39478c767d22c2f" UNIQUE ("attendance_code"), CONSTRAINT "PK_7879c3f654d19f112d91eab7828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."report_types" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type_code" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_979b513e88427a1300b06a46d99" UNIQUE ("type_code"), CONSTRAINT "UQ_4700b6422dbc0efa20dd03406cf" UNIQUE ("name"), CONSTRAINT "PK_cf77ff01fa1da1f9978995e67c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."report_areas" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "area_code" character varying(100) NOT NULL, "short_name" character varying(50) NOT NULL, "name" character varying(255) NOT NULL, "report_type_id" uuid NOT NULL, "workshop_id" uuid NOT NULL, CONSTRAINT "PK_cc4ff57f2925347ff2d40630a40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."reports" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "count" integer NOT NULL DEFAULT '0', "report_area_id" uuid NOT NULL, "shift_id" uuid NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."schedules" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "schedule_code" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_1a72adaf898e04bfbae78fa7aa9" UNIQUE ("schedule_code"), CONSTRAINT "UQ_758daa8476fd77ea422efacf7b9" UNIQUE ("name"), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."teams" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "team_number" integer NOT NULL, CONSTRAINT "UQ_85092a191b583630c658639f32d" UNIQUE ("team_number"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."shifts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "date" date NOT NULL, "shift_code" integer NOT NULL, "workshop_id" uuid NOT NULL, "team_id" uuid NOT NULL, "schedule_id" uuid NOT NULL, CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."work_places" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(255) NOT NULL, "workshop_id" uuid NOT NULL, "profession_id" uuid NOT NULL, CONSTRAINT "PK_413bd59d3dd6688158e02b5f5f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."employee_shifts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "is_ready" boolean NOT NULL DEFAULT false, "employee_id" uuid NOT NULL, "shift_id" uuid NOT NULL, "shift_profession_id" uuid NOT NULL, "attendance_type_id" uuid NOT NULL, "work_place_id" uuid, CONSTRAINT "PK_eb34f4c63fe25596ca37bd6e097" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."employees" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "patronymic" character varying(50) NOT NULL, "personal_number" integer NOT NULL, "account_id" uuid NOT NULL, "assignment_id" uuid NOT NULL, "home_workshop_id" uuid NOT NULL, "home_team_id" uuid NOT NULL, "home_profession_id" uuid NOT NULL, "home_schedule_id" uuid NOT NULL, CONSTRAINT "UQ_dc6bca444650b4fd3fed011a3ba" UNIQUE ("personal_number"), CONSTRAINT "REL_8d40590e5c06e521ed077552c4" UNIQUE ("account_id"), CONSTRAINT "REL_1eaec5be1de9835aa8f2f1edc3" UNIQUE ("assignment_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."professions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "profession_code" character varying(100) NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_af7fd95fb12c57564b76e8fd826" UNIQUE ("profession_code"), CONSTRAINT "UQ_b273de78f494fa9da6952ffa703" UNIQUE ("name"), CONSTRAINT "PK_9247c0d4b30fc6b796d59262058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."assignments" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "is_active" boolean NOT NULL DEFAULT true, "current_workshop_id" uuid NOT NULL, "current_team_id" uuid NOT NULL, "current_profession_id" uuid NOT NULL, "current_schedule_id" uuid NOT NULL, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pack_studio_schema"."workshops" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "workshop_code" character varying(20) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "UQ_43a3dcc06a838a398e203c8d40f" UNIQUE ("workshop_code"), CONSTRAINT "UQ_84a8c763773a6482ba066f608c3" UNIQUE ("name"), CONSTRAINT "PK_6d0e82a124f5b53df91c8989848" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."report_areas" ADD CONSTRAINT "FK_87415560840c84369cf0c67a22d" FOREIGN KEY ("report_type_id") REFERENCES "pack_studio_schema"."report_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."report_areas" ADD CONSTRAINT "FK_b9057e3eea2bb336a4d761666d1" FOREIGN KEY ("workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."reports" ADD CONSTRAINT "FK_3c8888472a1bd95e70516522305" FOREIGN KEY ("report_area_id") REFERENCES "pack_studio_schema"."report_areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."reports" ADD CONSTRAINT "FK_ad08da829833dd2033c6ab08954" FOREIGN KEY ("shift_id") REFERENCES "pack_studio_schema"."shifts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" ADD CONSTRAINT "FK_72912b29e61822dc9d2eb59d71a" FOREIGN KEY ("workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" ADD CONSTRAINT "FK_f014536f789e3e754e1729af922" FOREIGN KEY ("team_id") REFERENCES "pack_studio_schema"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" ADD CONSTRAINT "FK_b17c445e16bf291ee1f6cbf5168" FOREIGN KEY ("schedule_id") REFERENCES "pack_studio_schema"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."work_places" ADD CONSTRAINT "FK_13a560f66a0da4b0b154b126dcb" FOREIGN KEY ("workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."work_places" ADD CONSTRAINT "FK_80b1440dca40741014444c38e07" FOREIGN KEY ("profession_id") REFERENCES "pack_studio_schema"."professions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" ADD CONSTRAINT "FK_6724eec1f7473e66ce69e7d0bc0" FOREIGN KEY ("employee_id") REFERENCES "pack_studio_schema"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" ADD CONSTRAINT "FK_9b4cf056bf73f4f2cc13c55cd27" FOREIGN KEY ("shift_id") REFERENCES "pack_studio_schema"."shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" ADD CONSTRAINT "FK_c5d8064e9c96791ab1abe7472a6" FOREIGN KEY ("shift_profession_id") REFERENCES "pack_studio_schema"."professions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" ADD CONSTRAINT "FK_855781a6afa37e2cfbe03b59243" FOREIGN KEY ("attendance_type_id") REFERENCES "pack_studio_schema"."attendance_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" ADD CONSTRAINT "FK_a3f0d5bad3466f158a361d7aee2" FOREIGN KEY ("work_place_id") REFERENCES "pack_studio_schema"."work_places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_8d40590e5c06e521ed077552c42" FOREIGN KEY ("account_id") REFERENCES "pack_studio_schema"."accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_1eaec5be1de9835aa8f2f1edc37" FOREIGN KEY ("assignment_id") REFERENCES "pack_studio_schema"."assignments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_a65b1cf6b00a04644153c1057cd" FOREIGN KEY ("home_workshop_id") REFERENCES "pack_studio_schema"."workshops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_43ed700acdfde248ec69aaa36f5" FOREIGN KEY ("home_team_id") REFERENCES "pack_studio_schema"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_21db35e24758ba1b6993d39437d" FOREIGN KEY ("home_profession_id") REFERENCES "pack_studio_schema"."professions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" ADD CONSTRAINT "FK_e414c8fb4bb615898c635ecac63" FOREIGN KEY ("home_schedule_id") REFERENCES "pack_studio_schema"."schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_e414c8fb4bb615898c635ecac63"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_21db35e24758ba1b6993d39437d"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_43ed700acdfde248ec69aaa36f5"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_a65b1cf6b00a04644153c1057cd"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_1eaec5be1de9835aa8f2f1edc37"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employees" DROP CONSTRAINT "FK_8d40590e5c06e521ed077552c42"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" DROP CONSTRAINT "FK_a3f0d5bad3466f158a361d7aee2"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" DROP CONSTRAINT "FK_855781a6afa37e2cfbe03b59243"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" DROP CONSTRAINT "FK_c5d8064e9c96791ab1abe7472a6"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" DROP CONSTRAINT "FK_9b4cf056bf73f4f2cc13c55cd27"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."employee_shifts" DROP CONSTRAINT "FK_6724eec1f7473e66ce69e7d0bc0"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."work_places" DROP CONSTRAINT "FK_80b1440dca40741014444c38e07"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."work_places" DROP CONSTRAINT "FK_13a560f66a0da4b0b154b126dcb"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" DROP CONSTRAINT "FK_b17c445e16bf291ee1f6cbf5168"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" DROP CONSTRAINT "FK_f014536f789e3e754e1729af922"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."shifts" DROP CONSTRAINT "FK_72912b29e61822dc9d2eb59d71a"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."reports" DROP CONSTRAINT "FK_ad08da829833dd2033c6ab08954"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."reports" DROP CONSTRAINT "FK_3c8888472a1bd95e70516522305"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."report_areas" DROP CONSTRAINT "FK_b9057e3eea2bb336a4d761666d1"`);
        await queryRunner.query(`ALTER TABLE "pack_studio_schema"."report_areas" DROP CONSTRAINT "FK_87415560840c84369cf0c67a22d"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."workshops"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."assignments"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."professions"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."employees"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."employee_shifts"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."work_places"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."shifts"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."teams"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."schedules"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."reports"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."report_areas"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."report_types"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."attendance_types"`);
        await queryRunner.query(`DROP TABLE "pack_studio_schema"."accounts"`);
    }

}
