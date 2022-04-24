describe("navigation", () => {
	it("Should navigate to learning page", () => {
		cy.visit("http://localhost:3000/");
		cy.get('a[href*="/learning"]').click();

		cy.url().should("include", "/learning");
	});
});
