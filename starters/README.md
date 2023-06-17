# Peppubuild

> Peppubuild is the opensource alternative to [Bubble](https://bubble.io). We're building the future of web development with our visual editor, allowing teams bootstrap their applications using frameworks and languages they love.

## Table of contents

- [Project Name](#peppubuild)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Saving changes](#saving-changes)
    - [Publishing Changes](#publishing-changes)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment]() for notes on how to deploy and host Peppubuild.

## Installation
Start with installing the Peppubuild CLI globally on your local machine:

```sh
$ npm install -g peppubuild
```
This will generate the Peppubuild folder in your local machine. Please note that the Peppubuild folder will be created in the directory where you run the install command.

Now, navigate to the Peppubuild folder and run the build command to serve Peppubuild's user interface.

```sh
$ npm run build
```

## Usage

### **Saving changes**
Currently, Peppubuild doesn't auto save your work. Therefore, you'll need to save your changes using the save button at the top of the panel or run the command below. This action will update the `dist/peppubuild.json` file. 

```sh
$ peppubuild save
```

### **Publishing Changes**
When you're satisfied with your work, publish your changes. You can do this by clicking on the publish button or running the command below. This action will bootstrap your changes into any framework of your choice.

```sh
$ peppubuild publish
```

## **Contributing**

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Ukpai Ugochi** - *Initial work* - [Ukpai Ugochi](https://github.com/hannydevelop)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)