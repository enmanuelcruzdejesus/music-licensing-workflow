import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateSongDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  artist!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  isrc?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMs?: number;
}
