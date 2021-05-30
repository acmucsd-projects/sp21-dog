using Microsoft.EntityFrameworkCore.Migrations;

namespace SlideSync.Migrations
{
    public partial class MoreTaskInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Tasks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text",
                table: "Tasks",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Text",
                table: "Tasks");
        }
    }
}
