export class User {
  id: string;
  isBot: boolean;
  firstName: string;
  username?: string;
  lastName?: string;

  constructor(
    id: string,
    is_bot: boolean,
    firstName: string,
    username?: string,
    lastName?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isBot = is_bot;
    this.username = username;
  }
}