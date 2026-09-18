Ben McMann Frontend Engineer Assessment - Transactions Dashboard

# How to set up the project

1. Clone the repo
2. cd into ags-assignment
3. npm install
4. npm run dev
5. go to http://localhost:5173/

# My Process

- I had a good idea of how I would make a table view for the data going into it, and how I would specifically handle sort, filter and search
- I scaffolded the project with all files and components I would need. I used static test data to prototype.
- I researched the best way to approach saving state across refreshes (see use of AI #2 below).
- I Built out the data table with all search, sort and filters.
- I looked at the real data to ensure I understood the shape, it was as expected.
- While implementing, decided I needed to lift a lot of state out of the data table so I could see filtered results in the aggregate stats as well (minor refactor).
- I considered my export implementation, and decided to use a package I have used before for CSV formatting (papaparse)
- For an aggregate summary, I decided to intially show simple text based metrics, and if time permitted I would make graphs, charts, etc.
- I focused on functionality first, leaving visual flair only if time permitted

# Things I Would Improve On

- add color coding to status in table
- standardize color mappings with visuals (so games have same colors in pie charts and so bar chart matches status colors I noted above)
- rework my table row implemntation to size columns better
- clean up my code a bit (organize util functions, better comments, a little more component abstraction)
- standardize styling more via custom styled components (header text, body text, etc.)
- clean up styling and design more
- add some real error handling (data doesnt load, bad filter, no chart display etc)
- write tests!
- add filters to export
- add some more responsiveness

# Use of AI

I elected to use the browser version of ChatGPT for this assignment. I used in in the following ways

1. to setup boilerplate for the repository. Vite, react, react router, tailwind
2. to brainstorm solutions for handling reload state. I intially considered frontend browser storage, or some sort of server-side storage (overly complex). URL query params was suggested, and I really liked the idea since it made data views savable and sharable. This would be an extremely useful feature in practice. ChatGPT helped me prototype how to use react-router for this purpose. I particularly liked this because this is a feature that is helpful on LinkedIn to save very specific job searches.
3. to generate some test data, as I prefer prototyping with static data.
4. to generate abstract components for charts using Recharts. I chose the library since I am familiar with it.
5. to write a utility function to reformat ISO date strings.
6. to write an example reducer to generate some mapped aggregate statistics.
7. to help intiate auto download of csv file in export handler
8. to generate colors for my graphs

All other code was hand written.

I had a fun time working on this project, thank you for the opportunity! I am excited to discuss it in more detail :)
