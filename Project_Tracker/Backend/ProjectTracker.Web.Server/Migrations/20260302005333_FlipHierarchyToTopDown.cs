using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectTracker.Web.Server.Migrations
{
    /// <inheritdoc />
    public partial class FlipHierarchyToTopDown : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_MainTasks_MaintaskId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_MainTasks_Subtasks_SubtaskId",
                table: "MainTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Categories_CategoryId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CategoryId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "SubtaskId",
                table: "MainTasks",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_MainTasks_SubtaskId",
                table: "MainTasks",
                newName: "IX_MainTasks_CategoryId");

            migrationBuilder.RenameColumn(
                name: "MaintaskId",
                table: "Categories",
                newName: "ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_MaintaskId",
                table: "Categories",
                newName: "IX_Categories_ProjectId");

            migrationBuilder.AddColumn<int>(
                name: "MainTaskId",
                table: "Subtasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Subtasks_MainTaskId",
                table: "Subtasks",
                column: "MainTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Projects_ProjectId",
                table: "Categories",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MainTasks_Categories_CategoryId",
                table: "MainTasks",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_MainTasks_MainTaskId",
                table: "Subtasks",
                column: "MainTaskId",
                principalTable: "MainTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Projects_ProjectId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_MainTasks_Categories_CategoryId",
                table: "MainTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_MainTasks_MainTaskId",
                table: "Subtasks");

            migrationBuilder.DropIndex(
                name: "IX_Subtasks_MainTaskId",
                table: "Subtasks");

            migrationBuilder.DropColumn(
                name: "MainTaskId",
                table: "Subtasks");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "MainTasks",
                newName: "SubtaskId");

            migrationBuilder.RenameIndex(
                name: "IX_MainTasks_CategoryId",
                table: "MainTasks",
                newName: "IX_MainTasks_SubtaskId");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Categories",
                newName: "MaintaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ProjectId",
                table: "Categories",
                newName: "IX_Categories_MaintaskId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CategoryId",
                table: "Projects",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_MainTasks_MaintaskId",
                table: "Categories",
                column: "MaintaskId",
                principalTable: "MainTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MainTasks_Subtasks_SubtaskId",
                table: "MainTasks",
                column: "SubtaskId",
                principalTable: "Subtasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Categories_CategoryId",
                table: "Projects",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
