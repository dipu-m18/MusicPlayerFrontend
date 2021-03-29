import { Track } from './track';
import { LikedTrack } from './likedTrack';
export class User{
    emailId: string;
    name: string;
    password: string;
    newPassword: string;
    phoneNumber: string;
    likedTracks: LikedTrack[];
}