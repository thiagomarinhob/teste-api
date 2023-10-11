import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddTeacherRoom1696954555170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "rooms",
      new TableColumn({
        name: "teacherId",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "rooms",
      new TableForeignKey({
        columnNames: ["teacherId"],
        referencedColumnNames: ["id"],
        referencedTableName: "teachers",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("rooms", "teacherId");
    await queryRunner.dropColumn("rooms", "teacherId");
  }
}
