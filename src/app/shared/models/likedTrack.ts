import { Track } from "../../shared/models/track";

export class LikedTrack{
    likedTrackId: number;
    userEmailId: string;
    track: Track;
    liked: boolean;
    errorMessage: string;
    successMessgae: string;
}
