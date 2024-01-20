export default class Notification {
  private messages: {
    title: string;
    detail: string;
    type: string;
    status: number;
    instance?: string;
  }[] = [];

  addMessage(
    title: string,
    detail: string,
    type: string,
    status: number,
    instance?: string
  ): void {
    this.messages.push({ title, detail, type, status, instance });
  }

  hasMessages(): boolean {
    return this.messages.length > 0;
  }

  getMessages(): {
    title: string;
    detail: string;
    type: string;
    status: number;
    instance?: string;
  }[] {
    return this.messages;
  }
}
