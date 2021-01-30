# Cypress opening new tabs causes cookies to be introduced into subsequent tests

Cookies are seemingly coming out of nowhere causing independent tests to fail.

## Installing

```
git clone https://github.com/Qarj/cypress-test-tiny.git
cd cypress-test-tiny
npm i
```

## Reproducing the problem

```
npx cypress open
```

Double click on `cookieBug.js`.

## Isolating the problem

In the file `cypress/integration/cookieBug.js` comment out the line

```
    causeBug();
```

and run again, all tests should run ok.

## What is happening

The application under test opens up new browser tabs on clicking the applicable elements.

We set up a spy to check that the redirect url for the new tabs is fired and is correct.

This test passes perfectly fine everytime.

However the subsequent tests are getting poisoned by cookies from these new tabs.

What appears to happen is this:
* Test 1 ends as soon as it has validated the redirect
* Test 2 now starts
* Meanwhile, the new tabs left over from test 1 continue to load and create cookies
* These new cookies end up appearing in Test 2

My understanding of Cypress is that it cannot control anything in the new browser tabs
due to being stuck in a security sandbox.

However the reverse does not appear to be true - these detached tabs / windows can affect Cypress!
