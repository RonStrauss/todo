[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Github Pages Build][gh-pages-shield]][gh-pages-url]

<br />
<div align="center">
  <a href="https://github.com/RonStrauss/ng-todo"></a>

<h3 align="center">CPAT-Compliant To-Do List Application</h3>

  <p align="center">
    This project is a To-Do List application that meets Compliance with Public Access Technologies (CPAT) standards. The goal is to create an accessible, front-end-only web application using Angular.
  </p>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Core Features](#core-features)
- [Reasoning](#reasoning)
- [Structural Choices I Regret](#structural-choices-i-regret)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Installation](#installation)
- [CPAT Compliance](#cpat-compliance)
  - [Keyboard Accessibility](#keyboard-accessibility)
  - [Accessibility and Screen Reader Compatibility](#accessibility-and-screen-reader-compatibility)
- [Testing Process](#testing-process)
- [Documentation](#documentation)
- [GitHub Repository](#github-repository)

## Core Features

-  Add a new to-do item.
-  Mark items as completed.
-  Delete items from the list.


## Reasoning

I was tasked with building an accessible Todo app using Angular, within 24 hours.
Material seemed like the obvious choice, since the material design adheres to WCAG. However, this seemed too
easy, and therefore I've decided to try and create the app all by myself, from scratch.
I'm unfamiliar with accessibility standards, although i was aware of ARIA tags and screen readers. I've tried my best, and I'm pleased with the results.


## Structural Choices I Regret

There were a few intentional decisions made:
- Todo apps usually hide the deletion button, and reveal it only on hover. I've decided against that, since the user should always know they can delete the task item. This proved to be a bit overwhelming in terms of UX, a column of a darker red next to every task item isn't as pleasant to look at.
- Components should render as shadow dom. Shadow dom is a more native web technology than angular's unique view encapsulation. This choice ended up making the e2e testing less easy and intuitive to write. 


## Technologies Used

-  **Framework**: Angular 14 (This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.)
-  **Testing Tools**: axe-core with cypress, karma, NVDA, Chrome Lighthouse, Manual Testing
    (All testing done on Windows, Chrome)

## Deployment

The application is deployed on GitHub Pages and can be accessed [here](https://ronstrauss.github.io/ng-todo/).

## Installation

To install and run this app locally, simply clone the repo, install dependencies, and run it.
**Tools Needed**: git, Node.js 16+ 
1. Clone the report locally, then run `git clone "https://github.com/RonStrauss/ng-todo"`.
2. `cd` into the directory, and run `npm i`.
3. After that, run `npm run dev` to start and open the development server.  

## CPAT Compliance

### Keyboard Accessibility

-  All functionality is accessible via keyboard navigation (e.g., tabbing, enter, space), thanks to the native functionality provided by the operating system and browser.
-  Clear and visible focus indicators are included on interactive elements, again, thanks to native functionality provided by the operating system and browser.

### Accessibility and Screen Reader Compatibility

-  Appropriate labels or descriptive text are used to clarify each interactive element’s purpose, with correct label associations applied.
-  A combination of semantic HTML and ARIA roles is used to correctly and easily convey element purposes and communicate changes to assistive technologies.
-  Screen readers can interpret and describe the purpose and state of each element, with relevant announcements triggered during interactions.

## Testing Process

-  **axe-core**: Used for automated accessibility testing, covering approximately 57% of known issues.
-  **NVDA**: Screen reader testing to ensure compatibility, manually fixing issues as they pop up.
-  **Chrome Lighthouse**: Audited the application for accessibility compliance, noted possible issues that can't be covered with lighthouse.
-  **Manual Testing**: Unfortunately, many key points require manual intervention and testing, slowing down the whole process. I wasn't able to find a quick and free solution for some of the issues.

## Documentation

This README documents:

-  How CPAT guidelines were implemented.
-  The process for testing screen reader and keyboard accessibility.

## GitHub Repository

The source code for this project is available on GitHub: [ng-todo](https://ronstrauss.github.io/ng-todo/)

[contributors-shield]: https://img.shields.io/github/contributors/RonStrauss/ng-todo?style=for-the-badge
[contributors-url]: https://github.com/RonStrauss/ng-todo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/RonStrauss/ng-todo.svg?style=for-the-badge
[forks-url]: https://github.com/RonStrauss/ng-todo/network/members
[stars-shield]: https://img.shields.io/github/stars/RonStrauss/ng-todo.svg?style=for-the-badge
[stars-url]: https://github.com/RonStrauss/ng-todo/stargazers
[issues-shield]: https://img.shields.io/github/issues/RonStrauss/ng-todo.svg?style=for-the-badge
[issues-url]: https://github.com/RonStrauss/ng-todo/issues
[license-shield]: https://img.shields.io/github/license/RonStrauss/ng-todo.svg?style=for-the-badge
[license-url]: https://github.com/RonStrauss/ng-todo/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ronstrauss-webdev/
[gh-pages-shield]: https://img.shields.io/badge/-text?style=flat&logo=githubpages&logoSize=auto
[gh-pages-url]: https://ronstrauss.github.io/ng-todo/
