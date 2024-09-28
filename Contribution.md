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
*   [createFrontend][15]
    *   [Parameters][16]
*   [updateDB][17]
    *   [Parameters][18]
*   [deleteContent][19]
    *   [Parameters][20]
    *   [Delete\_Project][21]
        *   [Parameters][22]
*   [Retrieve\_Project][23]
    *   [Parameters][24]
*   [Delete\_Project][25]
    *   [Parameters][26]
*   [Save\_Project][27]
    *   [Parameters][28]
*   [Publish\_Project][29]

##

Peppubuild uses Firebase for authentication and Google Drive (appDataFolder) to store user information.
Since we are only accessing (appDataFolder), we can't access the users files in drive, only information we
have created. For more information, checkout [https://developers.google.com/drive/api/guides/appdata][30].

## startServer

All of our functions are wrapped around the startServer() function.
At the end of the file, we call this function and listen to port 1404.

## getContent

This function retrieves the gjs JSON content, which forms our website page, from Google's Drive (appDataFolder).

### Parameters

*   `Id` **[number][31]** FileId
*   `accessToken` **[string][32]** Oauth Access Token

## Clientdeploy

app.post('/clientdeploy/:pname', (req, res) => {})
Route serving deploy, to publish project.
We use FTP server to upload files.
We also call uploadFrom() with params readablestream and file name.

### Parameters

*   `pname` **[string][32]** Project name
*   `page` **callback** gjs page data.

## createSub

Create Subdomain
This function creates a subdomain for our user in our Namecheap shared hosting account.

### Parameters

*   `name` **[string][32]** Subdomain name

## listFiles

This function lists all projects created with Peppubuild, from Google's Drive (appDataFolder).

### Parameters

*   `accessToken` **[string][32]** Oauth Access Token

## Logout

app.get('/logout', (\_req, res) => {})
This route deletes the cookie pepputoken, which contains our Oauth.

### Parameters

*   `pepputoken` **[string][32]** res.clearCookie

## Login

app.get('/logout', (\_req, res) => {})
This route retrieves Oauth token after authentication with firebase.
Next, it stores the cookie pepputoken, which contains our Oauth.

### Parameters

*   `providerToken` **[string][32]** Oauth token

## createFrontend

Create File to store application's data on Google Drive (appDataFolder).

### Parameters

*   `projectName` **[string][32]** Project Name
*   `accessToken` **[string][32]** Oauth AccessToken

## updateDB

Update the project file created on Google Drive (appDataFolder), with gjs JSON.

### Parameters

*   `project` &#x20;
*   `Id` **[string][32]** FileId
*   `accessToken` **[string][32]** Oauth AccessToken
*   `projectName` **[string][32]** Project Name

## deleteContent

Function to delete file and the content of the project.

### Parameters

*   `Id` **[string][32]** FileId
*   `accessToken` **[string][32]** Oauth AccessToken
*   `projectName` **[string][32]** Project Name

### Delete\_Project

app.post('/pdelete/:id', (req, res) => {})
Route to delete project from Google Drive.

#### Parameters

*   `Id` **[string][32]** File Id

## Retrieve\_Project

app.post('/project/:id', (req, res) => {})
Route to retrieve the data of a single project. Useful route for loading editor with pre-saved project.

### Parameters

*   `Id` **[string][32]** File Id

## Delete\_Project

app.post('/pdelete/:id', (req, res) => {})
Route to retrieve all of the projects from Drive.

### Parameters

*   `token` **[string][32]** Oauth Token

## Save\_Project

app.put('/save/:id', (req, res) => {})
Route to save changes to corresponding file on Drive.

### Parameters

*   `token` **[string][32]** Oauth Token

## Publish\_Project

app.post('/publishfront/:name', (req, res) => {})
Route to publish file to Namescheap

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

[15]: #createfrontend

[16]: #parameters-6

[17]: #updatedb

[18]: #parameters-7

[19]: #deletecontent

[20]: #parameters-8

[21]: #delete_project

[22]: #parameters-9

[23]: #retrieve_project

[24]: #parameters-10

[25]: #delete_project-1

[26]: #parameters-11

[27]: #save_project

[28]: #parameters-12

[29]: #publish_project

[30]: https://developers.google.com/drive/api/guides/appdata

[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[32]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String