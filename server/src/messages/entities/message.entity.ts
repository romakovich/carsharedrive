import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("Messages")
export class MessagesEntity {
    @ObjectIdColumn()
    _id;

    @Column()
    time: number;

    @Column()
    fromUser: string

    @Column()
    toUser: string

    @Column()
    message: string

    @Column()
    isRead: boolean

    @Column()
    emoji: Array<string>

    @Column()
    chatBot;

    @Column()
    lastTrip: Record<string, any>;
}
