# IPCom (v.5) Control web

IPCom (v.5) Control web is the management interface for the IPCom receiver, used to control operator access and user administration. It can be accessed either via a web browser or through the IPCOM Windows .exe utility.

![IPcom5 Control web login screen.](./image3.png)

## Access and User Management

### Access

#### Login via web browser

<ol class="ipcom-steps">
  <li>In the address bar of the browser, enter the receiver IP address or domain and TCP port.</li>
  <li>Enter your username and password in the login window.</li>
  <li>Press the Login button.</li>
</ol>

!!! note
    This method does not save login history. It is recommended to use the bookmarks function of the browser for quick access.

#### Login via .exe program

<ol class="ipcom-steps">
  <li>Run the IPCOM .exe application.</li>
  <li>Create and save connections to different receivers.</li>
</ol>

!!! note
    This method is convenient when working with many different receivers because it saves their address list.

### User management

Administration of user accounts and their rights.

!!! warning
    Changing the administrator password (Action required!).

#### Changing your password

<ol class="ipcom-steps">
  <li>
    <p>Select a tab from the top menu bar <strong>Users</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-users-tab.png" alt="Users tab in the IPcom Control web interface." />
    </div>
  </li>
  <li>
    <p>Click on a user in the list <strong>Password</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-password-list.png" alt="User list with Password column highlighted." />
    </div>
    <p>Note: Check the box to see passwords, <strong>Show passwords</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-show-passwords.png" alt="Show passwords option highlighted." />
    </div>
  </li>
  <li>Enter a new password in the field.</li>
  <li>
    <p>Press to save <strong>Write Settings</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-write-settings.png" alt="Write settings button in the top bar." />
    </div>
  </li>
</ol>

#### Creating a new user

<ol class="ipcom-steps">
  <li>
    <p>Click in the list of users <strong>Add User</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-add-user.png" alt="Add User button in the users list." />
    </div>
  </li>
  <li>
    <p>Fill in the fields: <strong>Login</strong>, <strong>Name</strong>, <strong>Password</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-fill-fields.png" alt="Login, name, and password fields highlighted." />
    </div>
  </li>
  <li>
    <p><strong>Scopes (Rights)</strong> section, check the required authorizations.</p>
    <div class="ipcom-step-media">
      <img src="./step-scopes-row.png" alt="Scopes column highlighted." />
    </div>
    <p>Detailed explanations are provided by hovering over the authority and clicking on the question mark (?) symbol.</p>
    <div class="ipcom-step-media">
      <img src="./image2.png" alt="Edit scopes panel with rights list." />
    </div>
  </li>
  <li>
    <p>Choose which receivers the user will have access to.</p>
    <div class="ipcom-step-media">
      <img src="./step-visible-receivers-row.png" alt="Visible receivers column highlighted." />
    </div>
    <p>The default option for the user is <strong>All (Visi)</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./step-visible-receivers.png" alt="Visible receivers selection dialog." />
    </div>
  </li>
  <li>
    <p>In the box <strong>Token time</strong> set the session lifetime.</p>
    <div class="ipcom-step-media">
      <img src="./step-token-time-row.png" alt="Token time column highlighted." />
    </div>
    <p>The default option for the user is <strong>An hour</strong>.</p>
    <div class="ipcom-step-media">
      <img src="./image1.png" alt="Token expiration time dialog." />
    </div>
  </li>
</ol>

!!! note
    Create individual user accounts with limited rights to ensure system management and traceability of actions.

!!! warning "Safety note"
    Consider restricting logins by IP address for added security.
