# Usage

1.  Clone this project
2.  Install [node](https://nodejs.org/en/) on your machine
3.  Redirect to the project folder
4.  Install cv-ssg globally by using `npm install -g .`
5.  Use command line tool and type `cv-ssg -i <file name> -s <stylesheet link>` or `cv-ssg -c <path-to-config-file>`
6.  The dist folder will be placed right where you're at

# Before working on the project

`npm i`

# Prettier script

npm

`npx prettier --write .`

yarn

`yarn prettier --write .`

# ESlint script

`npx eslint .`

# Example

**./example/files/sample.txt**

```
This is line 1
This is line 2

This is line 3
```

After running `cv--ssg -i ./example/files -s default`

**./dist/sample.html**

```
<!doctype  html>
<html  lang="en">
	<head>
		<meta  charset="utf-8">
		<title>Filename</title>
		<meta  name="viewport"  content="width=device-width, initial-scale=1">
		<link  rel='stylesheet'  href='https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'>
	</head>
	<body>
		<p>This is line 1</p>
		<p>This is line 2</p>

		<p>This is line 3</p>
	</body>
</html>
```

**config.json**

```
{
  "input": "./example/files/sample.txt",
  "output": "./build",
  "lang": "fr"
}

```

After running `cv--ssg -c config.json`

**./dist/sample.html**

```
<!doctype  html>
<html  lang="en">
	<head>
		<meta  charset="utf-8">
		<title>Filename</title>
		<meta  name="viewport"  content="width=device-width, initial-scale=1">
	</head>
	<body>
		<p>This is line 1</p>
		<p>This is line 2</p>

		<p>This is line 3</p>
	</body>
</html>
```
