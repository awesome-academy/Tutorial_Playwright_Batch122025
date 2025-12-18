export class LoginPage {
  async gotoLoginPage(): Promise<void> {
    console.log("Go to Login Page");
  }

  async login(username: string, password: string): Promise<void> {
    console.log(`Login with ${username} / ${password}`);
  }
}