import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./chat-input.css'],
})
export class ChatInputComponent {
  userInput: string = '';

  // emits the message up to app.component
  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    const trimmed = this.userInput.trim();

    // don't send empty messages
    if (!trimmed) return;

    this.messageSent.emit(trimmed); // send to parent
    this.userInput = ''; // clear input
  }

  // send on Enter key, new line on Shift+Enter
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
