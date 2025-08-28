using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SuncoLab.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AlterAlbum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Show",
                table: "Albums",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Show",
                table: "Albums");
        }
    }
}
