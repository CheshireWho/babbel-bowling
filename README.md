# babbel-bowling
Scoring system for a bowling game for Babbel's take home test

## Install Dependencies
```
npm install
```

## Run
To start the http-server and open the app in the browser, execute:
````
npm run app
```

## Status
The score table gets filled with the number of pins hit per roll. Bowling-specific symbols for strike, spare and miss apply.

After each frame, the current score shows up in the table.

Because I ran out of time, I did not finish implementing the special rules for calculating the score and the delay in filling the score fields for strikes and spares.
I left my attempt to solve this last issue in the code, but disabled it as comments so that the current code is working. I marked the code belonging to my attempt with `todo` messages.

In general, the code has many comments and there are quite a lot and descriptive commit messages to give an idea of my thought process.
