using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ImageIdntityApdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Members_MemberId",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Image");

            migrationBuilder.RenameColumn(
                name: "MemberId",
                table: "Image",
                newName: "MemberID");

            migrationBuilder.RenameIndex(
                name: "IX_Image_MemberId",
                table: "Image",
                newName: "IX_Image_MemberID");

            migrationBuilder.AlterColumn<string>(
                name: "MemberID",
                table: "Image",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Members_MemberID",
                table: "Image",
                column: "MemberID",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Members_MemberID",
                table: "Image");

            migrationBuilder.RenameColumn(
                name: "MemberID",
                table: "Image",
                newName: "MemberId");

            migrationBuilder.RenameIndex(
                name: "IX_Image_MemberID",
                table: "Image",
                newName: "IX_Image_MemberId");

            migrationBuilder.AlterColumn<string>(
                name: "MemberId",
                table: "Image",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Image",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Members_MemberId",
                table: "Image",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id");
        }
    }
}
