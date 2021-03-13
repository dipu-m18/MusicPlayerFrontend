import { Track } from './track';

export class User{
    emailId: string;
    name: string;
    password: string;
    newPassword: string;
    phoneNumber: string;
    likedTracks: Track[];
}