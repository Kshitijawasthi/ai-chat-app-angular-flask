import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiUrl = 'http://127.0.0.1:5000/chat';

  constructor(private http: HttpClient) {}

  sendMessage(history: Message[]): Observable<{ response: string }> {
    const payload = {
      history: history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    };

    return this.http.post<{ response: string }>(this.apiUrl, payload);
  }
}
