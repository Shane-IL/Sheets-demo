# Sheets demo

This is based on a job interview question I had about a year ago. I was asked to sketch out how I would manage the data and state for a basic spreadsheet app.
I did not really give a good answer in the interview but I thought it would be a good exercise to try and build it out,
particularly after I started using recoil and realized it would be a good fit for this type of problem.

Currently changes reflected in each cell will only re-render cells with them as a dependencies. This is done by keeping track of the cells that 
depend on each cell and only re-rendering those cells when a change is made using recoil's atom and selector families. 
Formulas follow the format of: "={cellId}{operator}{cellId}" where the operator is: +, -, *, /
For now they are simply parsed and evaluated using the built in eval function. This will be changed in a future version to use a custom parser and evaluator.

*Full Disclosure: I used chatGPT to help with some of my Regex*

## Roadmap

 - Stage 1 is just the basic data structure, state and a simple UI to display it.

 - Stage 2 will be to make the UI nicer

 - Stage 3 will be to add the ability to insert rows and columns

 - Stage 4 will be to support nested formulas

 - Stage 4 will be to change the formula evaluation to use custom logic and support more operations.