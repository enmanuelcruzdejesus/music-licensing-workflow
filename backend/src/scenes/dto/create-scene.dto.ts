import { IsInt, IsString, Min, MinLength } from "class-validator";
import { TimeRangeDto } from "../../common/dto/time-range.dto";

export class CreateSceneDto extends TimeRangeDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsInt()
  @Min(0)
  orderIndex!: number;
}
