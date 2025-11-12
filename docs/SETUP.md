# Project Setup

This document provides instructions for setting up and running the project locally.

## Prerequisites

- Node.js and npm/yarn installed.
- Expo Go app on your mobile device (for running on a physical device).

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/plake492/react-native-task-manager-.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd react-native-task-manager-
    ```

3.  Install dependencies. This project uses yarn, so it is recommended to use yarn.
    ```bash
    yarn install
    ```
    or if you prefer npm:
    ```bash
    npm install
    ```

## Running the Application

Use the following scripts to run the application:

- To start the development server:
  ```bash
  yarn start
  ```
- To run on Android:
  ```bash
  yarn android
  ```
- To run on iOS:
  ```bash
  yarn ios
  ```
- To run on web:
  ```bash
  yarn web
  ```

## Debugging

### "Exception in HostFunction: expected dynamic type 'boolean', but had type 'string'"

This error in Expo Go indicates a type mismatch when a native module (host function) expects a boolean value but receives a string instead.

A common cause for this is a mismatch between the JavaScript and native code versions of a library. To fix this, you can run the following command to ensure all your Expo packages are on the correct version:

```bash
npx expo install --check
```
