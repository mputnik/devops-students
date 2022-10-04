# Getting Started with Create React App

## git Submodules
- Initialize submodule folders (if the folders appear empty when pulled/merged/etc.). **Execute command at top-level directory - the same directory that the .gitmodules file must be in.**
    ```sh
    git submodule update --init
    ```

## Set Up Virtual Environment

### For MAC OS/Linux:
- Install pip3
    ```sh
    sudo apt-get install python3-pip
    ```
- Install virtualenv
    ```sh
    pip3 install virtualenv
    ```
- Change Directory
    ```sh
    cd <project-path>/devops-students/react-website
    ```
- Create Virtual Env
    ```sh
    virtualenv -p python3 venv
    ```
- Activate Virtual Env
    ```sh
    source venv/bin/activate
    ```
- Install Project Requirements
    ```sh
    pip3 install -r requirements.txt
    ```
- Add node.js Virtual Env to Existing venv
    ```sh
    nodeenv -p
    ```
- Update to Latest npm Version
    ```sh
    npm install -g npm
    ```
- Install react Dependencies
    ```sh
    npm install
    ```
- Deactivating Virtual Env
    ```sh
    deactivate
    ```

### For Windows 10/11:
- Download & Install Python 3.10.7
    - Click [this link](https://www.python.org/ftp/python/3.10.7/python-3.10.7-amd64.exe) to download Python 3.10.7 executable, the default installation should install pip on your Windows machine as well.
    -  Add Python & pip to the PATH variable
        1. Open the Run dialog box by pressing the Windows key + R.
        2. Type in sysdm.cpl and press Enter to access System Properties.
        3. Under the the Advanced tab click Environment Variables
        4. Under User variables select Path and click Edit.
        5. Click New and the following paths seperately:
            ```sh
            C:\Users\{YOUR_USER}\AppData\Local\Programs\Python\Python310
            C:\Users\{YOUR_USER}\AppData\Local\Programs\Python\Python310\Scripts
            ```
        6. Under System variables select Path and click Edit
        7. Click New and the following path:
            ```sh
            C:\Users\{YOUR_USER}\AppData\Local\Programs\Python\Python310
            ```

- Install virtualenv
    ```sh
    pip install virtualenv
    ```
- Change Directory
    ```sh
    cd <project-path/devops-students/react-website>
    ```
- Create Virtual Env
    ```sh
    virtualenv -p python3 venv
    ```
- Activate Virtual Env
    ```sh
    source venv/Scripts/activate
    ```
- Install Project Requirements
    ```sh
    pip install -r requirements.txt
    ```
- Add node.js Virtual Env to Existing venv
    ```sh
    nodeenv -p
    ```
- Update to Latest npm Version
    ```sh
    npm install -g npm
    ```
- Install react Dependencies
    ```sh
    npm install
    ```
- Deactivating Virtual Env
    ```sh
    deactivate
    ```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs both client and server applications in the same terminal using concurrently. \
Visit [http://localhost:3000](http://localhost:3000) to access client app.
Visit [http://localhost:8080](http://localhost:8080) to access server app. \

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.