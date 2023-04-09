import { routes, errors, warnings } from "../../../utils/utils";
import { backendHost } from "../../support/consts";

const testEmail = "test@gmail.com";

describe("Signup", () => {
   beforeEach(() => {
      cy.visitPage(routes.signup.base);
      cy.intercept("*/account/signup").as("signup");
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
      cy.expectInputState("signup-firstname", {
         text: errors.requiredField,
         type: "error",
      });
      cy.expectInputState("signup-lastname", {
         text: errors.requiredField,
         type: "error",
      });
      cy.expectInputState("signup-password", {
         text: errors.requiredField,
         type: "error",
      });
      cy.expectInputState("signup-phone", {
         text: errors.requiredField,
         type: "error",
      });
      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: " ",
      })
         .expectInputState("signup-phone", {
            text: errors.requiredField,
            type: "error",
         })
         .expectInputState("signup-email", {
            text: warnings.gmailAddress,
            type: "warn",
         });

      cy.submitSignupForm({
         email: "test@gmail.com",
         firstname: "test",
         lastname: "ali",
         password: "12345",
         phone: "123456789",
      })
         .wait("@signup")
         .its("response")
         .should("exist");
   });
});
