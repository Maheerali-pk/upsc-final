import exp from "constants";
import { routes, errors, warnings } from "../../../utils/utils";
import { backendHost } from "../../support/consts";

const testEmail = "test@gmail.com";

describe("Signup", () => {
   beforeEach(() => {
      cy.visitPage(routes.signup.base);
      cy.intercept("POST", "**/account/signup").as("signup");
      cy.request({
         method: "POST",
         body: { email: testEmail },
         url: backendHost + "/account/delete-account",
         failOnStatusCode: false,
      });
   });
   it.skip("Basic UI testing for profession selection page", () => {
      cy.getByTestId("signin-apply-for-job")
         .should("exist")
         .should("not.have.class", "selected-item")
         .getByTestId("signin-hire-talent")
         .should("exist")
         .should("not.have.class", "selected-item")
         .getByTestId("signin-get-started")
         .should("be.disabled");
      cy.getByTestId("signin-apply-for-job")
         .click()
         .should("have.class", "selected-item")
         .getByTestId("signin-get-started")
         .should("not.be.disabled");
      cy.getByTestId("signin-login-link")
         .click()
         .url()
         .should("include", routes.login);
   });
   it("Test company signup", () => {
      //Give errors for empty fields
      cy.visitPage("/auth/signup")
         .getByTestId("signin-hire-talent")
         .click()
         .getByTestId("signin-get-started")
         .click()
         .url()
         .should("include", "/auth/signup/company");
      cy.submitSignupForm({
         email: " ",
         firstname: " ",
         lastname: " ",
         password: " ",
         phone: " ",
      });
      cy.expectInputState("signup-email", {
         text: errors.requiredField,
         type: "error",
      });

      cy.expectInputState("signup-password", {
         text: errors.requiredField,
         type: "error",
      });

      cy.submitSignupForm({
         email: testEmail,
         firstname: "test",
         lastname: "ali",
         password: " ",
         phone: " ",
      })
         .expectInputState("signup-password", {
            text: errors.requiredField,
            type: "error",
         })
         .expectInputState("signup-email", {
            text: warnings.gmailAddress,
            type: "warn",
         });

      //Successful registeration if no errors
      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: "123456789",
      });
      cy.wait("@signup")
         // .its("response.statusCode")
         // .should("eq", 200)
         .then((x) => {
            const body = x.request.body;
            console.log("body", body);
            expect(body.purpose).to.be.eq("COMPANY");
         });
      cy.url().should("include", routes.company.setupProfile.base);
   });
   it("Test the student signup", () => {
      cy.visitPage("/auth/signup")
         .getByTestId("signin-apply-for-job")
         .click()
         .getByTestId("signin-get-started")
         .click()
         .url()
         .should("include", routes.signup.student);

      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: "123456789",
      });
      cy.wait("@signup")
         // .its("response.statusCode")
         // .should("eq", 200)
         .then((x) => {
            const body = x.request.body;
            console.log("body", body);
            expect(body.purpose).to.be.eq("CANDIDATE");
         });
      cy.url().should("include", routes.student.setupProfile.base);
   });

   it("Gives duplicate user error", () => {
      cy.visitPage("/auth/signup/company");
      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: "123456789",
      });
      cy.visitPage("/auth/signup/company");
      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: "123456789",
      });
      cy.expectInputState("signup-email", {
         text: errors.userAlreadyExist,
         type: "error",
      });
   });
});
