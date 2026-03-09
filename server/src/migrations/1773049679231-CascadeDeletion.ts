import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeletion1773049679231 implements MigrationInterface {
    name = 'CascadeDeletion1773049679231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "ownerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_a132ba8200c3abdc271d4a701d8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_a132ba8200c3abdc271d4a701d8"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "ownerId" text NOT NULL`);
    }

}
