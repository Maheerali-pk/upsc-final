import { routes, errors, warnings } from "../../../utils/utils";
import { backendHost } from "../../support/consts";

const testEmail = "test@gmail.com";
const firstname = "test";
const lastname = "ali";
const password = "test123";
const phone = "12345678";
describe("Company Profile Setup", () => {
   before(() => {
      cy.visitPage(routes.signup.base);
      cy.intercept("POST", "**/account/signup").as("signup");
      cy.request({
         method: "POST",
         body: { email: testEmail },
         url: backendHost + "/account/delete-account",
         failOnStatusCode: false,
      });
      cy.visitPage("/auth/signup/company");
      cy.submitSignupForm({
         email: testEmail,
         firstname,
         lastname,
         password,
         phone,
      });
   });
   beforeEach(() => {});
   it("Test company profile setup", () => {});
});
