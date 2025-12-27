import { LoginPage } from "./loginPage";
import { DashboardPage } from "./dashboardPage";

async function testLogin() {
    const loginPage = new LoginPage("admin","123456");
    const dashboardPage = new DashboardPage();

    await loginPage.gotoLoginPage();
    await loginPage.login(loginPage);
    await dashboardPage.verifyLoginSuccess();
}
testLogin();


