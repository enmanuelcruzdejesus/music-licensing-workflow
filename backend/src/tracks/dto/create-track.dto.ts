import { IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TimeRangeDto } from "../../common/dto/time-range.dto";
import { CreateSongDto } from "../../songs/dto/create-song.dto";

export class CreateTrackDto extends TimeRangeDto {
  @IsOptional()
  @IsUUID("4")
  songId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSongDto)
  song?: CreateSongDto;

  @IsOptional()
  @IsString()
  @MinLength(1)
  note?: string;
}
