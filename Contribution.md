# Contributing to Peppubuild

Peppubuild is an open-source no-code builder, where you can visually create your websites, applications, and plug into a CMS of their choice. We appreciate your interest and efforts to contribute to Peppubuild. See the [LICENSE]() for licensing information.

## Repository Setup

This repository contains all the folders necessary to setup Peppubuild, except the website (peppubuild.com), whic is hosted at [Peppubuild Front](). Here's a summary of the folders, what they hold, and where they're hosted.

- Playground: This folder contains the frontend application for Peppubuild (https://app.peppubuild.com), hosted with Netlify. It makes calls to [server.js](./server.js), which is hosted in Cpanel's Node.js server.

- Plugins: Since Peppubuild is built on [Grapesjs](), we have some plugins to enhance the default editor. From page management, bootstrap, and panel enhancement.

- Server.js: This contains the functions for our server-side calls to Peppubuild. The utils folder is used by `server`.js.

## Functions and Methods.

This section contains a detailed overview of all the functions in the client, server, and plugin folders.

### Server.js
### Table of Contents

*   [][1]
*   [startServer][2]
*   [getContent][3]
    *   [Parameters][4]
*   [Clientdeploy][5]
    *   [Parameters][6]
*   [createSub][7]
    *   [Parameters][8]
*   [listFiles][9]
    *   [Parameters][10]
*   [Logout][11]
    *   [Parameters][12]
*   [Login][13]
    *   [Parameters][14]

##

Peppubuild uses Firebase for authentication and Google Drive \[appDataFolder] to store user information.
Since we are only accessing \[appDataFolder], we can't access the users files in drive, only information we
have created. For more information, checkout [https://developers.google.com/drive/api/guides/appdata][15].

## startServer

All of our functions are wrapped around the startServer() function.
At the end of the file, we call this function and listen to port 1404.

## getContent

This function retrieves the gjs JSON content, which forms our website page, from Google's Drive \[appDataFolder].
With our fileID, we can easily retrieve file and return its content.

### Parameters

*   `Id` **[number][16]** FileId
*   `accessToken` **[string][17]** Oauth Access Token

## Clientdeploy

app.post('/clientdeploy/:pname', (req, res) => {})
Route serving deploy, to publish project.
We use FTP server to upload files.
We also call uploadFrom() with params readablestream and file name.

### Parameters

*   `pname` **[string][17]** Project name
*   `page` **callback** gjs page data.

## createSub

Create Subdomain
This function creates a subdomain for our user in our Namecheap shared hosting account.

### Parameters

*   `name` **[string][17]** Subdomain name

## listFiles

This function lists all projects created with Peppubuild, from Google's Drive (appDataFolder).

### Parameters

*   `accessToken` **[string][17]** Oauth Access Token

## Logout

app.get('/logout', (\_req, res) => {})
This route deletes the cookie pepputoken, which contains our Oauth.

### Parameters

*   `pepputoken` **[string][17]** res.clearCookie

## Login

app.get('/logout', (\_req, res) => {})
This route retrieves Oauth token after authentication with firebase.
Next, it stores the cookie pepputoken, which contains our Oauth.

### Parameters

*   `providerToken` **[string][17]** Oauth token

[1]: #

[2]: #startserver

[3]: #getcontent

[4]: #parameters

[5]: #clientdeploy

[6]: #parameters-1

[7]: #createsub

[8]: #parameters-2

[9]: #listfiles

[10]: #parameters-3

[11]: #logout

[12]: #parameters-4

[13]: #login

[14]: #parameters-5

[15]: https://developers.google.com/drive/api/guides/appdata

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
