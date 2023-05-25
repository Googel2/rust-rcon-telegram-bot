Rust rcon bot for telegram. Based on bot from @DevJaehaerys https://github.com/DevJaehaerys/telegram-rust-rcon-bot

-Added exception list in config (messages from logs that contain exception word will not be sent to Telegram)
-Sending to Telegram only messages with: warning, debug, error types
-Logging of all entries regardless of message type
-Auto-cleaning of message.txt log daily
-If it fails to connect to the server, the bot will retry to connect every minute
-Removed sending rcon commands from chat

In the configuration it is necessary to specify:
tokenBot - Bot token
ip - ip server
port - rcon port
pwd - rcon password
admins - identifier of administrator to whom you want to send messages
Exclude - list of exceptions
