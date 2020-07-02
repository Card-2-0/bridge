import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Chats from "./Chats/Chats";
const ChatBox = ({
	chat,
	sendMessage,
	chatInput,
	setChatInput,
	setShowChat,
	user,
	acusers,
	usersinfo,
}: any) => {
	return (
		<div>
			<div className="chat-title">
				<h3>Chat</h3>
			</div>
			<ScrollToBottom className="chat">
				{chat.map((msg: string) => (
					<Chats
						name={msg.split("$")[0]}
						msg={msg.split("$")[1]}
						user={user}
						acusers={acusers}
						usersinfo={usersinfo}
					/>
				))}
			</ScrollToBottom>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					sendMessage();
				}}
			>
				<input
					value={chatInput}
					type="text"
					id="chat-input"
					className="chat-input"
					placeholder="Enter Message"
					onChange={(e) => {
						setChatInput(e.target.value);
					}}
				/>
				<button className="chat-send" type="submit">
					Send
				</button>
			</form>
			<button
				className="chat-close"
				onClick={(e) => {
					e.preventDefault();
					setShowChat(false);
				}}
			>
				Close
			</button>
		</div>
	);
};

export default ChatBox;
