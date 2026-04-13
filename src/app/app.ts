import {
  Component,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import mockMessage from './mockMessage.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements AfterViewInit {
  isLoggedIn = true;

  models = ['Claude-4.6', 'GPT-5.4', 'Gemini-2.5'];
  // apiEndpoint = {
  //   id: '1',
  //   role: 'ai',
  //   content: [{ type: 'text', text: 'Mock response from Angular' }],
  // };
  apiEndpoint = mockMessage;

  @ViewChild('chatbox', { static: false }) chatboxRef!: ElementRef;

  ngAfterViewInit() {
    if (this.chatboxRef && this.chatboxRef.nativeElement) {
      // Listen for custom event
      this.chatboxRef.nativeElement.addEventListener('ai-chat-message-sent', (event: any) => {
        // do anything you want with the event data
        console.log(
          'Testing if event is fired upon message sent from chatbox component',
          event.detail,
        );
      });
    }
  }
}
