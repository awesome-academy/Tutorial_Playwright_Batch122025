
interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

class User implements IUser {
  constructor(
    public name: string,
    public email: string,
    public isAdmin: boolean
  ) {}

  getInfo(): string {
    return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
  }
}

class AdminUser extends User {
  constructor(name: string, email: string) {
    super(name, email, true);
  }

  deleteUser(user: User): void {
    console.log(`Admin ${this.name} deleted user ${user.name}`);
  }
}

const user1 = new User("Le Thi Ha", "le.thi.ha@sun-asterisk.com", false);
const admin1 = new AdminUser("Admin Ha Le", "admin@sun-asterisk.com");
console.log(user1.getInfo());
console.log(admin1.getInfo());

const users: User[] = [user1, admin1];

users.forEach((user) => {
  console.log(user.getInfo());
});

admin1.deleteUser(user1);