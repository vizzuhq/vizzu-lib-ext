const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

async function processPackages(searchFolder, dependency, version) {
	const packageJsonFiles = glob.sync('*/package.json', { cwd: searchFolder, absolute: true })

	for (const packageJsonPath of packageJsonFiles) {
		const newVersion = updatePackageJson(packageJsonPath, dependency, version)
		const packageRoot = path.dirname(packageJsonPath)
		updateChangelog(path.join(packageRoot, 'CHANGELOG.md'), newVersion, version)
		updateTsFiles(packageRoot, version)
		updateDemoFiles(packageRoot, version)
	}
}

function updatePackageJson(packageJsonPath, dependency, version) {
	try {
		const packageJson = require(packageJsonPath)

		let newVersion
		const currentVersion = packageJson.version
		if (currentVersion) {
			const [major, minor] = currentVersion.split('.').map(Number)
			const newMinorVersion = minor + 1
			newVersion = `${major}.${newMinorVersion}.0`
			packageJson.version = newVersion
		}

		updateDependencies(packageJson, dependency, version, 'dependencies')
		updateDependencies(packageJson, dependency, version, 'devDependencies')
		updateDependencies(packageJson, dependency, version, 'peerDependencies')

		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson))

		return newVersion
	} catch (error) {
		console.error(`Error updating ${packageJsonPath}: ${error.message}`)
	}
}

function updateDependencies(packageJson, dependency, version, dependencyType) {
	if (packageJson[dependencyType]) {
		Object.keys(packageJson[dependencyType]).forEach((dep) => {
			if (dep === dependency) {
				packageJson[dependencyType][dep] = `~${version}`
			}
		})
	}
}

function updateChangelog(changelogPath, newVersion, version) {
	try {
		const [peerMajor, peerMinor] = version.split('.').map(Number)
		const content = fs.readFileSync(changelogPath, 'utf-8')
		const unreleasedIndex = content.indexOf('## [Unreleased]')
		if (unreleasedIndex !== -1) {
			const newContent =
				content.slice(0, unreleasedIndex + 16) +
				`\n\n## [${newVersion}]\n\n-   Set vizzu-${peerMajor}.${peerMinor}.x as a peer dependency` +
				content.slice(unreleasedIndex + 16)

			fs.writeFileSync(changelogPath, newContent)
		} else {
			console.error(`Error: Could not find "[Unreleased]" section in ${changelogPath}`)
		}
	} catch (error) {
		console.error(`Error updating ${changelogPath}: ${error.message}`)
	}
}

function updateTsFiles(packageRoot, version) {
	try {
		const tsFiles = glob.sync('**/*.ts', { cwd: packageRoot, absolute: true })

		for (const tsFilePath of tsFiles) {
			const content = fs.readFileSync(tsFilePath, 'utf-8')
			const newContent = content.replace(
				/(meta\s*=\s*{[^}]*version\s*:\s*)'(\d+\.\d+\.\d+)'/g,
				`$1'${version}'`
			)

			fs.writeFileSync(tsFilePath, newContent)
		}
	} catch (error) {
		console.error(`Error updating .ts files: ${error.message}`)
	}
}

function updateDemoFiles(packageRoot, version) {
	try {
		const [peerMajor, peerMinor] = version.split('.').map(Number)
		const demoFiles = glob.sync('**/demo.js', { cwd: packageRoot, absolute: true })

		for (const demoFilePath of demoFiles) {
			const content = fs.readFileSync(demoFilePath, 'utf-8')

			const updatedContent = content
				.replace(
					/'https:\/\/lib\.vizzuhq\.com\/(\d+)\.(\d+)\/([^']+)'/g,
					`'https://lib.vizzuhq.com/${peerMajor}.${peerMinor}/$3'`
				)
				.replace(
					/'https:\/\/cdn\.jsdelivr\.net\/npm\/vizzu@(\d+)\.(\d+)\/([^']+)'/g,
					`'https://cdn.jsdelivr.net/npm/vizzu@${peerMajor}.${peerMinor}/$3'`
				)

			fs.writeFileSync(demoFilePath, updatedContent)
		}
	} catch (error) {
		console.error(`Error updating demo.js files: ${error.message}`)
	}
}

function fixFormat(rootPath) {
	exec('yarn fix-format', { cwd: rootPath }, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`)
			return
		}
		if (stderr) {
			console.error(`Error: ${stderr}`)
			return
		}
		console.log(stdout)
	})
}

async function update(rootPath, searchFolder, dependency, version) {
	await processPackages(searchFolder, dependency, version)
	fixFormat(rootPath)
}

const rootPath = path.join(path.dirname(__filename), '..')
const searchFolder = path.join(rootPath, 'plugins')
const dependency = 'vizzu'
const version = process.argv[2]
if (!version) {
	console.error('Please provide the new vizzu version as an argument.')
	process.exit(1)
}

update(rootPath, searchFolder, dependency, version)
updatePackageJson(path.join(rootPath, 'package.json'), dependency, version)
