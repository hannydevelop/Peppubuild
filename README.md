# Peppubuild Visual Editor: Open source (Nocode/Lowcode tool) using JavaScript Frameworks and Languages you like.

Peppubuild is an open source alternative to [Bubble](https://bubble.io). However, we're taking the decoupled headless CMS approach.

You can build a full-stack application and also connect to the database of their choice with Peppubuild's visual editor. Since Peppubuild is a decoupled headless CMS, you can build only your application's frontend or backend and continue your development in other editors of your choice. 

The goal of Peppubuild is to allow teams build faster, while giving them full control of their codes. Since this is a Nocode/Lowcode tool, Nocode developers can build their web applications, without the need to write any code.

## Structure
<a href="https://imgbb.com/"><img src="https://i.ibb.co/1dHJH4Y/Untitled-3.png" alt="Untitled-3" border="0"></a>                

## Status
- [x] Alpha: We're testing Peppubuild with a closed set of customers.
- [ ] Public Alpha: Peppubuild is unstable but users can signup. 
- [ ] Public Beta: Peppubuild is stable enough for members of the public to use. Since it is still in test phase, users may find some errors.
- [ ] Public: Peppubuild is now stable for public use.

The current version of Peppubuild is the Alpha stage. If you would like to join the test, send a mail to contact@peppubuild.com.

## How it Works
Peppubuild is a hosted platform, you can signup and use the visual editor without the need to install anything. After creating your application, you can hit the publish button to synchronise your changes with a Git repository of your choice. Peppubuild also offers a self-hosted option, with our Github container image. For this, clone the Peppubuild repository:

```
git clone https://github.com/hannydevelop/Peppubuild.git
```

Next start docker images with docker compose:

```shell
docker compose up
```

Navigate to `http://localhost:8080` in your browser and start using Peppubuild.

You can learn more about Peppubuild from the [documentation]().

### Progress
Front-end Frameworks

- [x] VueJs
- [ ] ReactJs
- [ ] Angular

Backend
- [ ] NodeJs

Database
- [ ] Redis

We are currently implementing front-end scripting for VueJs. If you want to follow our Roadmap, checkout the [project board]() for our Alpha version.