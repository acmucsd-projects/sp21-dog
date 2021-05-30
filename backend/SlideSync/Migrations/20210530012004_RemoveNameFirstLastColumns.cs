using Microsoft.EntityFrameworkCore.Migrations;

namespace SlideSync.Migrations
{
    public partial class RemoveNameFirstLastColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "First",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Last",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "First",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Last",
                table: "Users",
                type: "text",
                nullable: true);
        }
    }
}
