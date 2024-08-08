export class MessageError {
  errors: { message: string }[];

  constructor(message: string) {
    this.errors = [{ message }];
  }
}
