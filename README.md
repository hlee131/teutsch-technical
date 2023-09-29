# Teutsch Partners Coding Take-Home

## Project Instructions

Create a calculator web app using React.js (and no other third-party libraries). The calculator should be capable of performing the following operations at a minimum (feel free to add more if you have time):

* addition
* subtraction
* multiplication
* division
* exponentiation

The end user should be able to operate the calculator via mouse *or via keyboard alone*. You should (and will likely need to) give more attention to keyboard interaction.

You don't need to worry about messing around with BigInt to provide higher precision than regular JavaScript floats have by default.

If you are feeling stumped and finding the instructions to be a bit open-ended, know that this is expected! When we evaluate your projects, we aren't going to be comparing your calculator to some perfect "gold standard" calculator. Obviously there are certain concrete criteria, but the real test is to see that you make thoughtful, deliberate design and code architecture decisions informed by the ramifications these decisions have on the end user and those who will collaborate on the code.

That said if you have any doubts or questions about our expectations for the project, please do not hesitate to reach out! Being proactive about clarifying development expectations is a necessity for the position! 

## Do's and Don'ts

DO:

* Add more features if you have time and want to show of your skills
* Make the calculator look aesthetically pleasing to show that you have design sense
* Change *any* part of the provided code as you see fit for any reason

DON'T:

* Install 3rd party dependencies (polyfills or types may be used, but ask first)
* Put all of the code in `App.tsx` or another component
  * The entire purpose of React is to create reusable components
* Change existing files to (or create new files that use) JavaScript
  * Our codebase uses TypeScript, so we want to test your TypeScript knowledge

## Development Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Information on the commands you will need to know is provided below, but you can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed! The easiest way to deploy will likely either be to use [Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages), but you can use any hosting option. To learn more about deployment, see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment).
