# AirCnC | Code & Coffee <br/>

### This is a study project only and has no involvement with the Airbnb brand. :books:

<img style="margin: 0 -50px;" src="frontend/src/assets/description.png" />

<hr/>

### Dev dependecies / APP dependencies

- Node.JS >= 10.16.3
- Yarn >= 1.19.0
- Expo >= 3.2.3
- NPM >= 6.9.0

#### APP
 - <a href="https://insomnia.rest/download/" target="blank">Insomina</a>

<hr />

### Getting started - Backend
<pre>
  cd backend
  yarn 
  yarn dev
</pre>

#### :warning: IMPORTANT :warning:
_To make your own changes, please create your cluster in <a href="https://www.mongodb.com/" target="blank">MongoDB Atlas</a>_

After create and init the cluster, change the database config in <b>backend/src/server.js</b> file<br/>

<pre>
mongoose.connect(
  `mongoose.connect('your-mongodb-connect-here`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
</pre>

The <b><em>aircnc-insomina.json</em></b> file you can import to your insomina after installed, it will already load all configured apis.

:heavy_exclamation_mark: The backend will start on 3333 port
<hr />

### :computer: Getting started the frontend 
<pre>
  cd frontend
  npm install
  npm start
</pre>

:heavy_exclamation_mark: The frontend will start on 3000 port

<hr />

### :iphone: Getting started the mobile 
<pre>
  cd mobile
  yarn
  yarn start
</pre>


:heavy_exclamation_mark: The backend will start on 19002 port and the Expo client on <b>exp://YourLocalIP:19000</b> or Tunnel.

:newspaper: <a href="https://docs.expo.io/versions/latest/workflow/how-expo-works/" target="blank">Learn about how expo works here.</a>

<hr/>

### <a href="http://linkedin.com/in/luizcelso" target="blank">Connect me in LinkedIn</a> | <a href="https://www.behance.net/lcelso" target="blank">See my Behance</a>