using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectTracker.Web.Server.Migrations
{
    /// <inheritdoc />
    public partial class RefineSubtaskHierarchy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_SubtaskCategories_Subtask_CategoryId",
                table: "Subtasks");

            migrationBuilder.DropIndex(
                name: "IX_Subtasks_Subtask_CategoryId",
                table: "Subtasks");

            migrationBuilder.DropColumn(
                name: "Subtask_CategoryId",
                table: "Subtasks");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subtasks",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddColumn<int>(
                name: "SubtaskId",
                table: "SubtaskCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SubtaskCategories_SubtaskId",
                table: "SubtaskCategories",
                column: "SubtaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubtaskCategories_Subtasks_SubtaskId",
                table: "SubtaskCategories",
                column: "SubtaskId",
                principalTable: "Subtasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubtaskCategories_Subtasks_SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.DropIndex(
                name: "IX_SubtaskCategories_SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.DropColumn(
                name: "SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subtasks",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AddColumn<int>(
                name: "Subtask_CategoryId",
                table: "Subtasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Subtasks_Subtask_CategoryId",
                table: "Subtasks",
                column: "Subtask_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_SubtaskCategories_Subtask_CategoryId",
                table: "Subtasks",
                column: "Subtask_CategoryId",
                principalTable: "SubtaskCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
