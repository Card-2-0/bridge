import React, { useState } from "react";
import ReactEmoji from "react-emoji";
import "./Chats.css";
const Chats = ({ name, msg, user, acusers, usersinfo }: any) => {
	let notViewer;
	if (usersinfo.length === 4) {
		notViewer = usersinfo.map((info: any) => {
			if (user !== info.name) {
				return info.name;
			} else {
				return null;
			}
		});
		notViewer = notViewer.filter((e: any) => e !== null);
	}

	if (notViewer !== undefined) {
		if (name === user) {
			return (
				<div className="messageContainer justifyEnd">
					<p className="sentText pr-10">{user}</p>
					<div className="messageBox backgroundRed">
						<p className="messageText colorWhite">
							{ReactEmoji.emojify(msg)}
						</p>
					</div>
				</div>
			);
		} else if (name === notViewer[0]) {
			return (
				<div className="messageContainer justifyStart">
					<div className="messageBox backgroundBlue">
						<p className="messageText colorWhite">
							{ReactEmoji.emojify(msg)}
						</p>
					</div>
					<p className="sentText pl-10">{name}</p>
				</div>
			);
		} else if (name === notViewer[1]) {
			return (
				<div className="messageContainer justifyStart">
					<div className="messageBox backgroundGreen">
						<p className="messageText colorWhite">
							{ReactEmoji.emojify(msg)}
						</p>
					</div>
					<p className="sentText pl-10">{name}</p>
				</div>
			);
		} else {
			return (
				<div className="messageContainer justifyStart">
					<div className="messageBox backgroundBlack">
						<p className="messageText colorWhite">
							{ReactEmoji.emojify(msg)}
						</p>
					</div>
					<p className="sentText pl-10">{name}</p>
				</div>
			);
		}
	} else {
		return null;
	}
};

export default Chats;
// console.log(acusers);
// console.log(usersinfo);
// console.log(notViewer);
