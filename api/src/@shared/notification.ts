export interface NotificationProps {
  title: string;
  detail: string;
  type: string;
  status: number;
  instance?: string;
}

export default class Notification {
  private messages: NotificationProps[] = [];

  addMessage(props: NotificationProps): void {
    this.messages.push(props);
  }

  addMessages(messages: NotificationProps[]): void {
    this.messages.push(...messages);
  }

  hasMessages(): boolean {
    return this.messages.length > 0;
  }

  getMessages(): NotificationProps[] {
    return this.messages;
  }
}
