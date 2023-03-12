import { errors } from "../../../utils/messages";
import { mailServerAddress } from "../../support/consts";

describe("Login", () => {
   beforeEach(() => {
      cy.visitPage("/auth/login");
   });
   it("Test the login process", () => {
      cy.getByTestId("btn_sign-in").click().expectInputState("input_email", {
         text: errors.requiredField,
         type: "error",
      });
   });
});
