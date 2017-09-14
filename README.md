# InvoiceFrontEnd
Front end for Invoice App with Angular/bootstrap

# Running the app
You need to have npm installed on your machine.

Clone the directory and cd into it.
Below commands will help setting your application development environment

```
npm install --only=dev
npm list --depth=0

```

Install http-server to run the app, not a must, but helps in not needing dedicated server to deploy the app.
```
npm install -g http-server

```
Check the port on which http-server runs and open the page in your browser eg port 8081

```
http://localhost:8080

```

# Test
```
karma start
```

The tests are written in Jasmine with karma launcher to execute those tests.
