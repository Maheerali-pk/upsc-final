import { routes, errors } from "../../../utils/utils";

describe("Signup", () => {
   beforeEach(() => {
      cy.visitPage(routes.signup.base);
   });
   it("Test company login", () => {
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
      cy.visitPage("/auth/signup")
         .getByTestId("signin-hire-talent")
         .click()
         .getByTestId("signin-get-started")
         .click()
         .url()
         .should("include", "/auth/signup/company");
      cy.visitPage("/auth/signup")
         .getByTestId("signin-apply-for-job")
         .click()
         .getByTestId("signin-get-started")
         .click()
         .url()
         .should("include", "/auth/signup/student");
   });
});
