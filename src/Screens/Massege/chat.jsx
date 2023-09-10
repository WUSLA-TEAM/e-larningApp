import React, {useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    // Add the new messages to the chat
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1, // User ID for the current user
        }}
      />
    </View>
  );
};

export default Chat;
