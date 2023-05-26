Rust rcon bot for telegram. Based on bot from @DevJaehaerys https://github.com/DevJaehaerys/telegram-rust-rcon-bot

-Added exception list in config (messages from logs that contain exception word will not be sent to Telegram)<br>
-Sending to Telegram only messages with: warning, debug, error types<br>
-Logging of all entries regardless of message type<br>
-Auto-cleaning of message.txt log daily<br>
-If it fails to connect to the server, the bot will retry to connect every minute<br>
-Removed sending rcon commands from chat<br>

In the configuration it is necessary to specify:<br>
tokenBot - Bot token<br>
ip - ip server<br>
port - rcon port<br>
pwd - rcon password<br>
admins - identifier of administrator to whom you want to send messages<br>
Exclude - list of exceptions<br>
