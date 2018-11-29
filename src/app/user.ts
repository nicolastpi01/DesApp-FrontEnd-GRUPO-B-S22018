export class User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  accessToken: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email
    };

}
