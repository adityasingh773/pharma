## How to run

After cloning the repo, run the following command:
`npm run install`

and then `npm run dev` to start the development server locally.

## API Mocking Approach

Import data.json file and return it through Next.js route. The route waits a bit(300ms) to simulate network request, then sends back the data in data.json file as if it came from a real API.”

## GenAI dataset note

The data.json located at data/data.json was generated using chatgpt from the following prompt:

```
Create a json dataset for a pharma SME for its modeled manufacturing process. The dataset has 3 processes. Each process has 2-3 subprocesses. Each subprocess has 3-6 tasks
Note: Each item must have following fields:
- id (unique)
- name
- description,
- status with any of these values: "pending", "approved", "needs_fix"
- lastUpdatedBy
- lastUpdatedAt
```

Note: Nothing was adjusted manually in the generated dataset.

The data structure in data.json was later updated to reduce time complexity of actions such as updating task status, calculate process progress, etc.

# App structure

The app uses the following structure:

app

    - api
        - processes
            - route
    - components
        - comments.tsx
    - hooks
        - api service hook
        - state mgmt hook
        - local storage service hook
    - lib
        - pure reusable js functions
    - top level Next.js specific files such as page.tsx, layout.tsx, etc

## Persistence strategy

A dedicated hook `useLocalStorage()` exports a function called `updateLocalStorage()`. Using this function, the state of the app can be constantly synced with data in local storage, provided that the function is called after the resepective state has updated.
Also, for the same data to be available upon refresh or page reload, a merge strategy is implemented that merges the data from the API with the data in the local storage. See `app/lib/merge-data.ts` for more.

## Tradeoffs

There is a lot of room for improvement to the current codebase considering scalability, maintainability and consistency. If I had 2 more days, I would work on the following points:

- Take test driven development approach and write appropriate unit and e2e tests.
- Make subprocess's and process's status change based on all the child task's status.
- Create new component to render process/subprocesses/tasks as a `Card` component item. This will reduce the lines of code in page.tsx file.
- Use a standard state management library like zustand/redux to standardize state management and data persistence. Using the library will also make the app scalable and easily maintainable if it grows.
- Improve the current implementation of service layer i.e `use-processes.ts` to make it more robust.
- Improve UX for stronger guidance by implementing a breadcrumb type navigation on the top of the page.
- Increase type safety.
- Move inline CSS to CSS file for consitency.
- Configure prettier, editorConfig and husky for consistent tooling across different environments.

## Final notes:

I slightly exceeded the allocated 1-hour time limit, so I was unable to complete the level 2 and level 3 tasks.
