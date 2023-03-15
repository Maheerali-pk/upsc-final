import { errors } from "../../../utils/utils";
import { mailServerAddress } from "../../support/consts";

describe("Login", () => {
   beforeEach(() => {
      cy.visitPage("/auth/login");
   });
   it("Test the login process", () => {
      cy.getByTestId("btn_sign-in")
         .click()
         .expectInputState("input_email", {
            text: errors.requiredField,
            type: "error",
         })
         .expectInputState("input_password", {
            text: errors.requiredField,
            type: "error",
         });
      cy.getByTestId("input_email")
         .type("test@123")
         .getByTestId("btn_sign-in")
         .click()
         .expectInputState("input_email", { text: "", type: "primary" });
      cy.getByTestId("input_password")
         .type("test12")
         .getByTestId("btn_sign-in")
         .click()
         .expectInputState("input_password", {
            text: errors.wrongCredentials,
            type: "error",
         });
      cy.getByTestId("input_password")
         .clear()
         .type("test123")
         .getByTestId("input_email")
         .clear()
         .type("test@gmail.com")
         .getByTestId("btn_sign-in")
         .click()
         .expectInputState("input_password", {
            text: "",
            type: "primary",
         })
         .expectInputState("input_email", {
            text: "",
            type: "primary",
         })
         .url()
         .should("include", "/student/dashboard")
         .then((_) => {
            expect(localStorage.getItem("auth-token")).to.exist;
         });
   });
   it("Test company login", () => {
      cy.getByTestId("input_password")
         .type("test123")
         .getByTestId("input_email")
         .type("company@gmail.com")
         .getByTestId("btn_sign-in")
         .click()
         .url()
         .should("include", "/company/dashboard");
   });
});
