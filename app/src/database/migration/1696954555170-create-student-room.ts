import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStudentRoom1696954342598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student_room",
        columns: [
          {
            name: "studentId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "roomId",
            type: "uuid",
            isPrimary: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "student_room",
      new TableForeignKey({
        columnNames: ["studentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "students",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "student_room",
      new TableForeignKey({
        columnNames: ["roomId"],
        referencedColumnNames: ["id"],
        referencedTableName: "rooms",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student_room");
  }
}
