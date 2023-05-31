sequenceDiagram
    participant browser
    participant server

    Note  between browser and server
    The user write as new note and clicks "Save", which triggers the event handler
    The DOM is updated with the new note
    The new note is converted to JSON format and sent to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->browser: 201 Created
