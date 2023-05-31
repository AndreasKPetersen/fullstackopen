sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server

    Note between browser and server
    The note is added to the server.

    server-->browser: 302 Found
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->browser: 200 OK - HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browser: 200 OK - CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->browser: 200 OK - JavaScript file
    deactivate server

    Note between browser and server
    The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browser: 200 OK - JSON file
    deactivate server

    Note between browser and server
    The browser executes an event handler, which renders the notes to the page using the DOM-API

    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server-->browser: 200 OK - HTML
    deactivate server
