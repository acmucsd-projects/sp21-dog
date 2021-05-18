using Microsoft.EntityFrameworkCore.Migrations;

namespace SlideSync.Migrations
{
    public partial class ComputePoints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "Users",
                type: "integer",
                nullable: false,
                computedColumnSql: "\"Nature\" + \"Fitness\" + \"Knowledge\" + \"Community\"",
                stored: true,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Points",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldComputedColumnSql: "\"Nature\" + \"Fitness\" + \"Knowledge\" + \"Community\"");
        }
    }
}
