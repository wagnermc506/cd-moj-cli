# cd-moj-cli
Unofficial command line interface written for nodejs to submit exercices on the [cd-moj platform](https://moj.naquadah.com.br)

### Install

It's not available at npm or yarn yet.

You can clone this repository, and add the bin file to the global scope.

Using yarn:

```
$ yarn global add <path/to/repository_dir>
```
To use it, you'll need to add the bin to the PATH system variable. You can see more about [here](https://classic.yarnpkg.com/en/docs/cli/global)


### Usage

The CLI is supposed to use in a folder to contain all the exercises of a contest. I counts with the commands:

```
$ moj init
```
Will ask the contest's login info, and create a file called "contest.json" in the current directory that saves this info.

```
$ moj submit <problem> <filename>
```
Will submit the file on the contest page.
The "contest.json" file must be created in the current directory.

<strong>problem</strong> is the index of the problem on the site(i.e. A, B, C...)

<strong>filename</strong> is the file that must exists in the current directory
