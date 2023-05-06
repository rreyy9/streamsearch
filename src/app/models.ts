export class StreamData {
    stream: Array<Stream>
    pagination: Pages
}

export class Stream {
    user_name:String
    game_name:String
    title:String
    viewer_count:Number
    started_at:String
}

export class NextData{
    user_name:String
    game_name:String
    title:String
    viewer_count:Number
    started_at:String
}

export class Pages{
    cursor: String
}

export class todo {
    userId: Number
    id: Number
    title: String
    completed: String
}

export class oauth {
    access_token: String
    expires_in: Number
}
