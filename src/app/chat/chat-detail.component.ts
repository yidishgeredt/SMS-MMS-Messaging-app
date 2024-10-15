import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { Chat, Message } from './chat.model';
import { ImageSource, knownFolders, path } from '@nativescript/core';
import { ImagePicker } from '@nativescript/imagepicker';
import { TNSRecorder, TNSPlayer } from '@nativescript/audio';

@Component({
  selector: 'ns-chat-detail',
  templateUrl: './chat-detail.component.html',
})
export class ChatDetailComponent implements OnInit {
  chat: Chat;
  messages: Message[];
  newMessage: string = '';
  audioProgress: number = 0;
  private recorder: TNSRecorder;
  private player: TNSPlayer;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
    this.recorder = new TNSRecorder();
    this.player = new TNSPlayer();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.chat = this.chatService.getChat(id);
    this.messages = this.chatService.getMessages(id);
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.addMessage(this.chat.id, this.newMessage, false, 'text');
      this.messages = this.chatService.getMessages(this.chat.id);
      this.newMessage = '';
    }
  }

  toggleMute(): void {
    this.chatService.toggleMute(this.chat.id);
    this.chat = this.chatService.getChat(this.chat.id);
  }

  async changeBackground(): Promise<void> {
    const context = imagepicker.create({
      mode: "single"
    });

    const selection = await context.present();
    if (selection.length > 0) {
      const selected = selection[0];
      const source = await ImageSource.fromAsset(selected);
      const folderPath = knownFolders.documents().path;
      const fileName = `chat_bg_${this.chat.id}.jpg`;
      const filePath = path.join(folderPath, fileName);
      const saved = await source.saveToFile(filePath, "jpg");

      if (saved) {
        this.chatService.setBackground(this.chat.id, filePath);
        this.chat = this.chatService.getChat(this.chat.id);
      }
    }
  }

  async sendPhoto(): Promise<void> {
    const context = imagepicker.create({
      mode: "single"
    });

    const selection = await context.present();
    if (selection.length > 0) {
      const selected = selection[0];
      const source = await ImageSource.fromAsset(selected);
      const folderPath = knownFolders.documents().path;
      const fileName = `photo_${Date.now()}.jpg`;
      const filePath = path.join(folderPath, fileName);
      const saved = await source.saveToFile(filePath, "jpg");

      if (saved) {
        this.chatService.addMessage(this.chat.id, '[Photo]', false, 'image', filePath);
        this.messages = this.chatService.getMessages(this.chat.id);
      }
    }
  }

  onMicButtonTouch(args: TouchGestureEventData): void {
    if (args.action === "down") {
      this.startRecording();
    } else if (args.action === "up") {
      this.stopRecording();
    }
  }

  private async startRecording(): Promise<void> {
    try {
      if (!TNSRecorder.CAN_RECORD()) {
        console.log('Cannot record audio.');
        return;
      }

      const audioFolder = knownFolders.documents().getFolder('audio');
      const recordingPath = path.join(audioFolder.path, `recording_${Date.now()}.m4a`);

      await this.recorder.start({
        filename: recordingPath,
        metering: true,
        infoCallback: (info) => {
          console.log('Info', info);
        },
        errorCallback: (error) => {
          console.log('Error', error);
        }
      });

      console.log('Recording started');
    } catch (err) {
      console.log('Error starting recording', err);
    }
  }

  private async stopRecording(): Promise<void> {
    try {
      const recordingPath = await this.recorder.stop();
      console.log('Recording stopped', recordingPath);
      this.chatService.addMessage(this.chat.id, '[Voice Message]', false, 'voice', recordingPath);
      this.messages = this.chatService.getMessages(this.chat.id);
    } catch (err) {
      console.log('Error stopping recording', err);
    }
  }

  async playVoiceMessage(audioPath: string): Promise<void> {
    try {
      await this.player.playFromFile({
        audioFile: audioPath,
        loop: false,
        completeCallback: () => {
          console.log('Audio file finished playing');
          this.audioProgress = 0;
        },
        errorCallback: (error) => {
          console.log('Error playing audio file', error);
        },
        infoCallback: (info) => {
          this.audioProgress = (info.duration / info.currentTime) * 100;
        }
      });
    } catch (err) {
      console.log('Error playing audio', err);
    }
  }
}