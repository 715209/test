import React, { PureComponent } from "react";
import styled from "styled-components";

const MessageStyle = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-auto-rows: auto;
  grid-template-areas: "userImage userInfo" "userImage userMessage";
  margin-bottom: 1em;
`;

const ImageStyle = styled.div`
  grid-area: userImage;
`;

const UserInfoStyle = styled.div`
  grid-area: userInfo;
`;

const UserMessageStyle = styled.div`
  grid-area: userMessage;
  padding-top: 5px;
`;

const TimestampStyle = styled.span`
  padding-right: 1em;
`;

const BadgesStyle = styled.span`
  float: right;
`;

const ImgStyle = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

class Message extends PureComponent {
  render() {
    const { timestamp, username, admin, message } = this.props.message;

    return (
      <MessageStyle>
        <ImageStyle>
          <ImgStyle
            src="https://cdn.discordapp.com/avatars/111583925750501376/ab76e8f10416f0b30da27e9bcb955f9f.png?size=128"
            alt="Avatar"
          />
        </ImageStyle>
        <UserInfoStyle>
          <div className="userMessage">
            <TimestampStyle>{timestamp}</TimestampStyle>
            <span>{username}</span>
            {admin && (
              <BadgesStyle>
                <span data-badge="moderator">MOD</span>
              </BadgesStyle>
            )}
          </div>
        </UserInfoStyle>
        <UserMessageStyle className="userMessage">
          <span className="message">
            <span>{message}</span>
          </span>
        </UserMessageStyle>
      </MessageStyle>
    );
  }
}

export default Message;
