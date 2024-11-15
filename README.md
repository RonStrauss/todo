# CPAT-Compliant Angular To-Do List

## Objective
This project is a To-Do List application that meets Compliance with Public Access Technologies (CPAT) standards. The goal is to create an accessible, front-end-only web application using Angular.

## Core Features
- Add a new to-do item.
- Mark item/s as completed.
- Delete item/s from the list.

## Technologies Used
- **Framework**: Angular 14 (This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.).
- **Testing Tools**: axe-core, NVDA, Chrome Lighthouse, Manual testing.

## Deployment
The application is deployed on GitHub Pages and can be accessed [here](https://ronstrauss.github.io/ng-todo/).

## CPAT Compliance
### Keyboard Accessibility
- All functionality is accessible via keyboard navigation (e.g., tabbing, enter, space).
- Clear and visible focus indicators are included on interactive elements.

### Accessible Descriptions and Labels
- Appropriate labels or descriptive text are used to clarify each interactive element’s purpose.
- Label associations are present and correctly applied.

### Semantic HTML and ARIA Roles
- Semantic HTML is used for structure, and ARIA roles are added to convey element purposes where necessary.
- ARIA states (e.g., `aria-checked` for completed items) are applied to communicate changes to assistive technologies.

### Screen Reader Compatibility
- Verified that screen readers can interpret and describe the purpose and state of each element.
- Confirmed that relevant announcements are triggered for screen readers when items are added, marked as completed, or deleted.

## Testing Process
- **axe-core**: Used for automated accessibility testing.
- **NVDA**: Screen reader testing to ensure compatibility.
- **Chrome Lighthouse**: Audited the application for accessibility compliance.

## Documentation
This README documents:
- How CPAT guidelines were implemented.
- The process for testing screen reader and keyboard accessibility.

## GitHub Repository
The source code for this project is available on GitHub: [ng-todo](https://ronstrauss.github.io/ng-todo/)