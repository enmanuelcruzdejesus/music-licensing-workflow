import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsDateString()
  releaseAt?: string;
}
