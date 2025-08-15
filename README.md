# Movie App (React Native)

A feature-rich movie application built with **React Native**. The app allows users to browse movies, search for films, add reviews and ratings, manage their favorite movies, and track recently watched movies. It uses **Firebase Authentication** for secure login and signup.

---

## Features

### Authentication
- Login and Signup using **Firebase Authentication**.
- Error handling for invalid credentials or network issues.
- After login/signup, users are redirected to the Home screen.

### Bottom Navigation
The app has **four main tabs**:

1. **Home**
   - Displays movies in **four sections**: Top Rated, Popular, Now Playing, Upcoming.
   - Supports **pagination** to navigate through multiple pages.
   - Clicking a movie opens **Movie Details**.

2. **Search**
   - Shows **Trending** and **Upcoming** movies.
   - Provides a **search bar** to find movies.
   - **Debounced search**: API requests are only sent after the user stops typing for a short period (to reduce unnecessary API calls).
   - Clicking a movie shows **Movie Details**.

3. **Wishlist**
   - Displays all movies marked as **Favorite** by the user.
   - Movies can be added/removed from favorites directly.

4. **Profile**
   - Shows **user information** (e.g., email).
   - Sections for **Favorite** movies and **Recently Watched** movies.
   - Logout button to sign out from the app.

### Movie Details
- Shows **movie poster, director,gener, cast, overall rating, and reviews**.
- **Watchlist Icon**: Clicking adds movies to **Recently Watched** section in Profile.
- **Add Review Button**: Opens a dedicated **Review screen** where users can write a review, give a **10-star rating**, and publish it.
- **Favorite Button**: Toggle to add/remove movies from Wishlist.

---

## Technologies Used

- **React Native** – Cross-platform mobile app framework.
- **Firebase Authentication** – User login and signup.
- **Redux Toolkit** – State management for movies, details, favourite, wishlist.
- **React Navigation** – Bottom tabs, stack navigation, and screen transitions.
- **TMDB API** – Fetch movie data including now playing, top rated, trending, popular, and upcoming movies.
- **Other Libraries**:
  - Axios for network requests
  - React Native Vector Icons
  - Pagination handling

---

## Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/YuRiKaPraJaPaTi/MovieProject.git
cd MovieProject
```

### Step 2: Install dependencies
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, you can make changes!

Open `App.tsx` or any file in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

### Congratulations! :tada:

You've successfully run the React Native App in youe device. :partying_face:

### Now what?

- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
