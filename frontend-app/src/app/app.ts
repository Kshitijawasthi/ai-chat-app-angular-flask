import { Component } from '@angular/core';
import { ChatService } from './services/chat.services';
import { Message } from './models/message.model';
import { ChatWindowComponent } from "./components/chat-window/chat-window";
import { ChatInputComponent } from "./components/chat-input/chat-input";

@Component({
  selector: 'app-root',
  imports: [ChatWindowComponent, ChatInputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  messages: Message[] = [];
  isLoading: boolean = false;
  constructor(private chatService: ChatService) {}

  handleMessage(userText: string) {
    const userMessage: Message = {
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };
    this.messages.push(userMessage);

    this.isLoading = true;

    this.chatService.sendMessage(this.messages).subscribe({
      next: (res) => {
        const botMessage: Message = {
          role: 'assistant',
          content: res.response,
          timestamp: new Date(),
        };
        this.messages.push(botMessage);
        this.isLoading = false;
      },
      error: (err) => {
        const errorMessage: Message = {
          role: 'assistant',
          content: '⚠️ Something went wrong. Please try again.',
          timestamp: new Date(),
        };
        this.messages.push(errorMessage);
        this.isLoading = false;
      },
    });
  }

  clearChat() {
    this.messages = [];
  }
}
