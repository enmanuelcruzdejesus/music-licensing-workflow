import { TimeRangeDto } from "../../common/dto/time-range.dto";
import { CreateSongDto } from "../../songs/dto/create-song.dto";
export declare class CreateTrackDto extends TimeRangeDto {
    songId?: string;
    song?: CreateSongDto;
    note?: string;
}
