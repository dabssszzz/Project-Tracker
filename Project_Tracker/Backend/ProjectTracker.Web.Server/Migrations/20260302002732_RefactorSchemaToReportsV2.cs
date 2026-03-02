using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectTracker.Web.Server.Migrations
{
    /// <inheritdoc />
    public partial class RefactorSchemaToReportsV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Projects_ProjectId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_MainTasks_Categories_CategoryId",
                table: "MainTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_SubtaskCategories_Subtasks_SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_Assignees_AssigneeId",
                table: "Subtasks");

            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_MainTasks_MainTaskId",
                table: "Subtasks");

            migrationBuilder.DropIndex(
                name: "IX_Subtasks_AssigneeId",
                table: "Subtasks");

            migrationBuilder.DropIndex(
                name: "IX_SubtaskCategories_SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Subtasks");

            migrationBuilder.DropColumn(
                name: "SubtaskId",
                table: "SubtaskCategories");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Assignees");

            migrationBuilder.RenameColumn(
                name: "MainTaskId",
                table: "Subtasks",
                newName: "Subtask_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Subtasks_MainTaskId",
                table: "Subtasks",
                newName: "IX_Subtasks_Subtask_CategoryId");

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

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    MaintaskId = table.Column<int>(type: "int", nullable: false),
                    SubtaskId = table.Column<int>(type: "int", nullable: false),
                    Subtask_CategoryId = table.Column<int>(type: "int", nullable: false),
                    AssigneeId = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    Date_Start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_Completed = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Date_Create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_Update = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Is_Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_Assignees_AssigneeId",
                        column: x => x.AssigneeId,
                        principalTable: "Assignees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_MainTasks_MaintaskId",
                        column: x => x.MaintaskId,
                        principalTable: "MainTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_SubtaskCategories_Subtask_CategoryId",
                        column: x => x.Subtask_CategoryId,
                        principalTable: "SubtaskCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Subtasks_SubtaskId",
                        column: x => x.SubtaskId,
                        principalTable: "Subtasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CategoryId",
                table: "Projects",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_AssigneeId",
                table: "Reports",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_CategoryId",
                table: "Reports",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_MaintaskId",
                table: "Reports",
                column: "MaintaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ProjectId",
                table: "Reports",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_StatusId",
                table: "Reports",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_Subtask_CategoryId",
                table: "Reports",
                column: "Subtask_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_SubtaskId",
                table: "Reports",
                column: "SubtaskId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_SubtaskCategories_Subtask_CategoryId",
                table: "Subtasks",
                column: "Subtask_CategoryId",
                principalTable: "SubtaskCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropForeignKey(
                name: "FK_Subtasks_SubtaskCategories_Subtask_CategoryId",
                table: "Subtasks");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CategoryId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "Subtask_CategoryId",
                table: "Subtasks",
                newName: "MainTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Subtasks_Subtask_CategoryId",
                table: "Subtasks",
                newName: "IX_Subtasks_MainTaskId");

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
                name: "AssigneeId",
                table: "Subtasks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubtaskId",
                table: "SubtaskCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Assignees",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Subtasks_AssigneeId",
                table: "Subtasks",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_SubtaskCategories_SubtaskId",
                table: "SubtaskCategories",
                column: "SubtaskId");

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
                name: "FK_SubtaskCategories_Subtasks_SubtaskId",
                table: "SubtaskCategories",
                column: "SubtaskId",
                principalTable: "Subtasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_Assignees_AssigneeId",
                table: "Subtasks",
                column: "AssigneeId",
                principalTable: "Assignees",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Subtasks_MainTasks_MainTaskId",
                table: "Subtasks",
                column: "MainTaskId",
                principalTable: "MainTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
