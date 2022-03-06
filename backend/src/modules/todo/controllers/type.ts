import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
    @ApiProperty({
        default: 404
    })
    statusCode: number;
    @ApiProperty({
        default: 'Todo with id=% not exist'
    })
    message: string
}
