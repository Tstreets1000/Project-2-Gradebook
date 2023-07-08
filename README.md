<h1><bold>GRADEBOOK API<bold><h1>
<p>PRIOR TO START (Install the following)</p>
<ol>
<p>Required<p>
    <li><a href="https://nodejs.org">Node.js</a></li>
    <li><a href="https://www.mongodb.com/cloud/atlas/register">MongoDB Atlas Database</a>
<p>Optional</p>
    <li><a href="https://www.npmjs.com/package/nodemon">Nodemon</a> 
</ol>

</p>Run npm install -g nodemon in your the terminal of choice. See code below.</p>
    <pre><code>npm install -g nodemon</code></pre>

<p>START</p>
    <ol>
        <li>Clone repository to your local machine.</li>
        <li>Open code in your choice of code editor.
        <li>Install needed packages and dependencies by running the following code; <code>npm install</code>
            <p>You should see the following dependencies in your package.json file;
            <code>"dependencies": bcrypt, dotenv express jsonwebtoken mongoosem morgan</code>
            <code>"devDependencies": artillery jest mongodb-memory-server supertest</code>
            </p>
        </li>
        <li>Create a .env file in the root directory to hold your MONGO_URI & SECRET. (Should be hashed/encrypted using SHA256.)</li>
        <li>Create a .gitignore file to house the the MONGO_URI & SECRET keys.</li>        
    </ol>

<p>SERVER & DATABASE CONNECTION</p>>
<p>Insure that the application is connected with the visual messages in your terminal window; (Both messages are found in the server.js file.)
    <li>'Mongo is metro boomin'</li>
    <li>`Shoot for the stars and land on the moon ${PORT} miles away`</li>
</p>

<p>POSTMAN</p>
<li>START with creating a teacher using a POST request. Once created, use the web token as the authorization key for access to other API features.</li>
<li>Adjust the headers to reflect raw JSON data & authentication token if needed.</li>
<li>Use the teacher Schema model to verify that the <bold>required</bold> informaiton is entered into the request body.</li>
<li>Click Submit Button!</li>
    <p>You should see the created Teacher.</p>
    <p>Proceed through the following routes as students, assignments & subjects need to be created.</p>

<p>TESTING WITH JEST & SUPERTEST</p>
<p>The server must not be running to test endroutes. Stop the server by using <code>pkill node</code> in you terminal.</p>
<p>Run the following commands in the terminal window to verify all test routes are successful.</p>
<li><code>npm run test</code> (Test all 24 routes)</li>
<li><code>npm run testTeacher</code> (Test only teacher routes)</li>
<li><code>npm run testSubject</code> (Test only subject routes)</li>
<li><code>npm run testStudent</code> (Test only student routes)</li>
<li><code>npm run testAssignment</code> (Test only assignment routes)</li>

<p>TESTING WITH ARTILLERY (LOAD TESTING)<p>
<p>The server will need to be running for this test. Start the server by using <code>npm run dev:true</code>
<p>Run the following commands in the terminal window to verify all test routes are successful.</p>
<li><code>npm run load</li>

<p>ERD DIAGRAM (LUCID CHART)</p>
<a href=""></a>

<p>TRELLO BOARD</p>
<a href="https://trello.com/b/tfZLSzEF/gradebook"></a>
