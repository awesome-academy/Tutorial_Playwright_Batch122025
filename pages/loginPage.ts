
export class LoginPage{
    public username: string;
    public password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    async gotoLoginPage(){
        console.log("Đi đến trang login...");
    }
    async login(us: LoginPage){
        console.log(`Đăng nhập với ${us.username} và ${us.password}`);
    }
}