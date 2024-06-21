## Title

Slidely Task 2 Backend

## Description

This project contains endpoint for slidely frontend

## Features

 - /ping - A `GET` request that always returns True

 - /submit - A `POST` request with parameters "name", "email", "phone", "github_link" and "stopwatch_time"

 - /read - A `GET` request with query parameter "index" which is a 0-index for reading the (index+1)th form submission.

 -/edit - A `PUT` request with with query parameter "index" which is a 0-index for editing the (index+1)th form submission.

 -/delete - A `DELETE` request with with query parameter "index" which is a 0-index for deleting the (index+1)th form submission.
 

# Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

```bash
    `git clone https://github.com/omkargade04/slidely-backend.git`

```

2. Navigate into the project directory:

```bash
   `cd slidely-backend`
```

## Important

4. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.

```bash
   `npm install -g npm@latest`
```

5. Install `dependencies` (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

6. Create a .env file in the directory and add your **PORT** accordingly

7. Run the below command to start the project

```bash
   `npm run dev`
```

8. Open `http://localhost:5000` on your API test(ex: `POSTMAN`) to view the test the APIs

9. Below is the link to the documentation of the endpoints
[Postman Documentation Link:](https://documenter.getpostman.com/view/27201705/2sA3XTfLQ8)

