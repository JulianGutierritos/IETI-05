<p align="center">
  <a href="https://material-ui.com/" rel="noopener" target="_blank"><img width="150" src="https://material-ui.com/static/logo.svg" alt="Material-UI logo"></a></p>
</p>

<h1 align="center">1.2 React Material</h1>

[![npm](https://img.shields.io/badge/npm-v6.13.4-red.svg)](https://www.npmjs.com/)
[![npx](https://img.shields.io/badge/dependencies-npx-orange)](https://www.npmjs.com/package/npx)
[![material](https://img.shields.io/badge/dependencies-material--ui-yellow)](https://material-ui.com/)
[![react-router](https://img.shields.io/badge/dependencies-react--router-blue)](https://reacttraining.com/react-router/)


React project using Material-UI library.

## Part 1: Create a Login Component
1. Clone the repository, install and run the project to verify that it works:

```javascript
npm install
npm start
```
Some vulnerabilities may be reported. Ignore them.

2. Install the `core`, `icons` and `pickers` dependencies from Material-UI to the project:

```javascript
npm install @material-ui/core
npm install @material-ui/icons
npm install @material-ui/pickers
```

You can also add the Material-UI dependencies straight into the `package.json` file and re-run the `install` command.

```javascript
{
  "name": "todo-app",
  ...
  "dependencies": {
    "@material-ui/core": "^4.9.0",
    "@material-ui/icons": "^4.5.1",
    "@material-ui/pickers": "^3.2.10",
    ....
  },
  ...
}

```

3. Under `src`, create a new folder called `components` and add two files named Login.js and Login.css using the following code:

> Login.js
```javascript
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'


export class Login extends React.Component{

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h2">Sign in</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}
```

> Login.css
```css
.layout {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.paper {
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.avatar {
    margin: 10px;
    background: floralwhite;
}

.form {
    width: 100%;
    margin-top: 30px;
}

.submit {
    marginTop: 20px;
}
```

Read more about how to organize your components [here] (https://reactjs.org/docs/faq-structure.html)

4. Add the Login component to the `App.js` render method in order to test your login component.


## Part 2: Enable App Navigation 

1. Refactor your `App.js`. 
    * Create a new file called `TodoApp.js` under the `components` folder and extract all the logic of the Todo App into this file.
    * Move the rest of the files related to the TodoApp component into the `components` folder.
    * Change the Todo components to use react Material elements: Button, TextField, Card and DatePickers.

2. Add the `react-router-dom` dependency to your `package.json` file and install it:

```javascript
   "react-router-dom": "^4.3.1"   
```

```javascript
   npm install
```
        
3. Create a constant for each View (Login and TodoApp) in the App.js file:

```javascript
const LoginView = () => (
      <Login/>
  );

const TodoAppView = () => (
      <TodoApp/>
  );
```

4. Import the following components in the `App.js` file:

```javascript
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
```

5. Update the _render_ method of `App.js` including the routing logic:

```javascript

    render() {

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <br/>
                    <br/>

                    <ul>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/todo">Todo</Link></li>
                    </ul>

                    <div>
                        <Route exact path="/" component={LoginView}/>
                        <Route path="/todo" component={TodoAppView}/>
                    </div>
                </div>
            </Router>
        );
    }
```

6. Run the application and test that the navigation works.

7. Read the _React Route Training_ documentation and learn about the BrowserRouter Component:
https://reacttraining.com/react-router/web/example/basic


8. Add a state *isLoggedIn* to the `App.js` component to know when and what view to display.

Tip: Don't attempt to use the _Redirect_ component of the React Router to handle your public and private routes. For now, it would be enough to allow or forbid the access to a _Route_ by using boolean javascript expression inside your JSX.

9. Set the default value of *isLoggedIn* to false and then add a condition inside the render method that renders the correct view.


## Part 3: Local Storage

In order to create Web applications that work offline we can use the local storage. You can use it directly on your js files as follows:

```javascript

//Save data
localStorage.setItem('key', value);

//Read data
localStorage.getItem('key');

```
  
1. Use the local storage to store a default user (username and password).

2. Add the click handler to Sign In button in order to verify that the user exists (use the one saved on the *localStorage*)

3. Once the user is authenticated successfully then store the *isLoggedIn* on the storage and add the logic to make sure this value is set to state everytime the application is loaded.
This will prevent the user authentication every time!

4. Run the application and then stop the server and verify the data is persisted.

Tip: You can use the Google Chrome Developer tools under the Application tab to explore the Local Storage. 
   
