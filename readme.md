# 11_Note_Taker_NN
BootCamp Homework - 11 Express.js: Note Taker

## The Challenge
Our client request us to modify starter code to create an application called Note Taker that can be used to write and save notes. This application will use an Express.js back end and will save and retrieve note data from a JSON file.
The application’s front end has already been created. Our job is to build the back end, connect the two, and then deploy the entire application to Heroku.


## Installation

The application will be invoked by using the following command:

```bash
npm start
```
Use following port to view the application:

```bash
http://localhost:3001/
```

Heroku deployment: 

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
``` 

## The Process
To satisfy the criteria, we had to:
- Install inquirer package
- Install path package
- Install express package
- Refractor CSS file to give HTML nootbook theme
- Code server.js to initialize applications' backend

Specific functions of server.js:

Create new note along with new object and alert terminal
```javascript
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("A new note has been saved: ", newNote);
    res.json(savedNotes);
})
```

Delte note along with object and alert terminal
```javascript
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteID;
    })
    
    for (currentNote of savedNotes) {
        currentNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

```

## The Result
After dynamically coding our backend application using Express.js along with refractoring CSS and HTML, we were able to provide a fully functional fullstack application that allows our client to write, store, retrieve, and delete notes.

## Submission
This project was uploaded to GitHub at the following repository link:
[https://github.com/nhanng19/notepad](https://github.com/nhanng19/notepad)

Deployed Web Application link: 