import {IsString} from "class-validator";

export class CreateParticipantDto {
    @IsString()
    name: string

    @IsString()
    role: string

    @IsString()
    avatarSrc: string
}
