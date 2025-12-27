 interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}
    
 class User implements IUser{

    public name: string;
    public email: string;
    public isAdmin: boolean;

    constructor (name: string, email: string, isAdmin: boolean){
        this.name =name;
        this.email = email;
        this.isAdmin = isAdmin;        
    }

    getInfo() {
        console.log(`User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`);
    }

}

 class AdminUser extends User{
    constructor(name: string, email: string){
        super(name, email, true);
    }

    deleteUser(user: User) {
        console.log(`Ban da xoa ${this.name} thanh cong`);
    }
}



const member1 = new User("Member 1", "member1@sun-asterisk.com",false);
const member2 = new User("Member 2", "member2@sun-asterisk.com",false);
const admin1 = new AdminUser("Admin 1", "admin1@sun-asterisk.com");

const userList: User[] = [member1, member2, admin1];
userList.forEach(user =>{
    user.getInfo();
});

admin1.deleteUser(admin1);