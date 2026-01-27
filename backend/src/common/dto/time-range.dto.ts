import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { IsGreaterThan } from "../validators/is-greater-than.validator";

export class TimeRangeDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  startMs!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsGreaterThan("startMs", { message: "endMs must be greater than startMs" })
  endMs!: number;
}
