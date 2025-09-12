using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SuncoLab.DAL.Migrations
{
    /// <inheritdoc />
    public partial class alterBlog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Blogs");

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Blogs",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Blogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Show",
                table: "Blogs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Blogs");

            migrationBuilder.DropColumn(
                name: "Show",
                table: "Blogs");

            migrationBuilder.AlterColumn<string>(
                name: "Body",
                table: "Blogs",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Blogs",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
