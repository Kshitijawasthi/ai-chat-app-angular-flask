import {
  Component,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  EventEmitter,
  Output,
} from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.html',
  styleUrls: ['./chat-window.css'],
})
export class ChatWindowComponent implements AfterViewChecked {
  @Input() messages: Message[] = [];
  @Input() isLoading: boolean = false;
  @Output() suggestionClicked = new EventEmitter<string>();
  // reference to the bottom of the chat
  @ViewChild('scrollBottom') scrollBottom!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.scrollBottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {}
  }

  suggest(text: string) {
    this.suggestionClicked.emit(text);
  }
}
