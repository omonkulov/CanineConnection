<img width="227" alt="image" src="https://github.com/omonkulov/CanineConnection/assets/38576836/73c90210-18c3-4e6e-ba15-a6dac90dd61a"/>

## Demo Link
Demo link: [Canine-Connection](https://canine-connection.vercel.app/)

## How to run the project localy
1. Create an `.env` file and add a domain variables like this: 

```
✅ Like this:
REACT_APP_DOMAIN=https://example.com

❌ Not like this:
REACT_APP_DOMAIN=https://example.com/
```
3. Open in terminal in the app directory and run `npm run start`
4. To run test run `npm run test`

## Features
Requirments
- ✅ Users must be able to filter by breed
- ✅ Results should be paginated
- ✅ Results should be sorted alphabetically by breed by default. Users should be able to modify this sort to be ascending or descending.
- ✅ All fields of the Dog object (except for id) must be presented in some form
- ✅ Everything is documented

Additonal
- ✅ User will stay logged in when page is refreshed
- ✅ If session expires user is directed to the login page
- ✅ Users are able to sort by minimum and maxium ages, breed and zip code. Or combinations of all.
- ✅ Supports pagination
- ❌ Doesn't save / load mached dogs on page refresh (time limit)

## Libraries and Frameworks
- 🚀 React.js + Typescript
- 📘 TailwindCSS
- ↗️ React-Router-Dom
- 💾 Recoil

## Folder Structure
Inside the src folder:
```
.
├── api  // API related files go here
│   └── takehomeApi.ts  // Take home assigned API calls 
├── components    // React components go here
│   ├── Home      // Home page (search) related components
│   │   ├── Search
│   │   │   └── ...
│   │   └── ...
│   ├── Matches // Matches page related components
│   │   └── ...
│   ├── Navbar  // Navigation bar related components
│   │   └── ...
│   └── ...
├── helpers   // Helper related files (frequently used values, functions across the app)
│   ├── defaultValues.ts  // Default values of states and etc..
│   └── helperFunctions.ts  // Functions that are used often or generic enough to be split out
├── recoil  // Recoil state management related files
│   ├── auth.ts // Sets up auth state for recoil
│   └── dogs.ts // Sets up wishlist and match state for recoil
├── routes
│   └── router.tsx // Creates a route map for react-router-dom
├── test
│   └── App.Test.ts // Jest testing for unit testing
└── types
    ├── types.d.ts. // Contains type definitions
    └── ...
```

## How to
Search using the filter
1. Change any filter settings ( sort, age, breed and zip) 
2. Click on Update Settings

Match a dog
1. Search for a dog and click on "Add to list" 
2. Add many dogs as you want to to list
3. Navigate to "My list" using the navigation bar
4. Here you manage all the dogs you have added to the "wish list"
5. Once you are happy with the wish list you can submit the list to find a dog
6. Under the 'Matched friends" you will see one dog from you wish list that matched you. 
7. Match dogs will have more location information exposed.
8. You can have multiple dogs matched.









