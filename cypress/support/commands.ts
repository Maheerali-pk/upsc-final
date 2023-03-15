// import messages from "../../frontend/src/utils/messages";
import { mailServerId } from "./consts";
type PageUrl =
   | "/auth/login"
   | "/auth/signup"
   | "/auth/signup/company"
   | "/auth/signup/student";

// const {} = typeof import("mailslurp-client");

declare global {
   namespace Cypress {
      interface Chainable {
         visitPage: (url: PageUrl) => Chainable<Cypress.AUTWindow>;
         getByTestId: (testId: TestId) => Chainable<HTMLElement>;
         expectInputState: (
            testId: TestId,
            state: InputState
         ) => Chainable<HTMLElement>;
         // expectError: (err?: string) => Cypress.Chainable;
         // expectMessage: (msg?: string) => Chainable;
         // expectNoMessage: () => Chainable;
         // closeDialog: () => Chainable;
         // expectNoError: () => Chainable;
         // submitRegisterForm: (detials: IRegisterDetails) => Chainable;
         // registerUser: (details: IRegisterDetails) => Chainable;
         // submitLoginForm: (detials: ILoginDetails) => Chainable;

         // expectUrlToBe: (url: PageUrl) => Chainable;
         // createInbox: () => Promise<InboxDto>;
         // waitForLatestEmail: (id: string) => Promise<Email>;
      }
      interface Chainable<Subject> {
         // task(event: "connectDb", arg: never): Chainable;
         // task(event: "findUserWithName", arg: string): Chainable<IUser>;
         // task(event: "findUserWithEmail", arg: string): Chainable<IUser>;
         // task(event: "dropUsers"): Chainable;
         // task(event: "getLastEmail", arg: string): Promise<string>;
      }
   }
}

Cypress.Commands.add("visitPage", (url: PageUrl) => {
   return cy.visit("http://localhost:3000" + url);
});
Cypress.Commands.add("getByTestId", (testId: TestId) => {
   cy.get(`*[data-testid=${testId}]`);
});
Cypress.Commands.add(
   "expectInputState",
   (testId: TestId, state: InputState) => {
      cy.getByTestId(testId).should("have.class", `input-${state.type}`);
      cy.getByTestId(testId)
         .find(".helper-text")
         .should("have.text", state.text);
   }
);
// Cypress.Commands.add("expectError", (err?: string) => {
//    cy.get(".swal2-error").should("exist");
//    if (err) {
//       cy.get("#swal2-html-container")
//          .should("have.html", err)
//          .get(".swal2-confirm")
//          .click();
//    }
// });
// Cypress.Commands.add("expectNoError", (err?: string) => {
//    cy.get(".swal2-error").should("not.exist");
// });
// Cypress.Commands.add("expectMessage", (message?: string) => {
//    if (message) {
//       cy.get("#swal2-html-container")
//          .should("have.html", message)
//          .get(".swal2-confirm")
//          .click();
//    }
// });
// Cypress.Commands.add("expectNoMessage", () => {
//    cy.get("#swal2-html-container").should("not.exist");
// });

// Cypress.Commands.add("closeDialog", (message?: string) => {
//    cy.get(".swal2-confirm").click();
// });
// Cypress.Commands.add("submitRegisterForm", (details: IRegisterDetails) => {
//    cy.getByTestId("username").clear().type(details.username);
//    cy.getByTestId("email").clear().type(details.email);
//    cy.getByTestId("password").clear().type(details.password);
//    cy.getByTestId("confirmPassword").clear().type(details.confirmPassword);
//    cy.getByTestId("register-btn").click();
// });
// Cypress.Commands.add("submitLoginForm", (details: ILoginDetails) => {
//    cy.getByTestId("username").clear().type(details.username);
//    cy.getByTestId("password").clear().type(details.password);
//    cy.getByTestId("login-btn").click();
// });
// Cypress.Commands.add("createInbox", () => {
//    return mailslurp.createInbox();
// });

// Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
//    return mailslurp.waitForLatestEmail(inboxId);
// });
// Cypress.Commands.add("registerUser", (details) => {
//    cy.submitRegisterForm(details)
//       .wait(5000)
//       .should(() => {
//          cy.mailosaurGetMessage(mailServerId, {
//             sentTo: details.email,
//          }).then((email) => {
//             const code = /[0-9]{5}/.exec(email.html.body)[0];
//             cy.getByTestId("otp-input").type(code);
//             cy.getByTestId("otp-btn").click();
//          });
//       });
// });
// Cypress.Commands.add("expectUrlToBe", (url) => {
//    cy.url().should("include", url);
// });

// export {};
// // declare global {
// //   namespace Cypress {
// //     interface Chainable {
// //       login(email: string, password: string): Chainable<void>
// //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
// //     }
// //   }
// // }
