const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

async function processPackages(searchFolder, peerDependency, peerVersion) {
	const packageJsonFiles = glob.sync('**/package.json', { cwd: searchFolder, absolute: true })

	for (const packageJsonPath of packageJsonFiles) {
		const newVersion = updatePackageJson(packageJsonPath, peerDependency, peerVersion)
		const packageRoot = path.dirname(packageJsonPath)
		updateChangelog(path.join(packageRoot, 'CHANGELOG.md'), newVersion, peerVersion)
		updateTsFiles(packageRoot, peerVersion)
		updateDemoFiles(packageRoot, peerVersion)
	}
}

function updatePackageJson(packageJsonPath, peerDependency, peerVersion) {
	try {
		const packageJson = require(packageJsonPath)

		const currentVersion = packageJson.version
		const [major, minor] = currentVersion.split('.').map(Number)
		const newMinorVersion = minor + 1
		const newVersion = `${major}.${newMinorVersion}.0`

		packageJson.version = newVersion

		if (packageJson.peerDependencies) {
			Object.keys(packageJson.peerDependencies).forEach((dep) => {
				if (dep === peerDependency) {
					packageJson.peerDependencies[dep] = `~${peerVersion}`
				}
			})
		}

		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson))

		return newVersion
	} catch (error) {
		console.error(`Error updating ${packageJsonPath}: ${error.message}`)
	}
}

function updateChangelog(changelogPath, newVersion, peerVersion) {
	try {
		const [peerMajor, peerMinor] = peerVersion.split('.').map(Number)
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

function updateTsFiles(packageRoot, peerVersion) {
	try {
		const tsFiles = glob.sync('**/*.ts', { cwd: packageRoot, absolute: true })

		for (const tsFilePath of tsFiles) {
			const content = fs.readFileSync(tsFilePath, 'utf-8')
			const newContent = content.replace(
				/(meta\s*=\s*{[^}]*version\s*:\s*)'(\d+\.\d+\.\d+)'/g,
				`$1'${peerVersion}'`
			)

			fs.writeFileSync(tsFilePath, newContent)
		}
	} catch (error) {
		console.error(`Error updating .ts files: ${error.message}`)
	}
}

function updateDemoFiles(packageRoot, peerVersion) {
	try {
		const [peerMajor, peerMinor] = peerVersion.split('.').map(Number)
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

async function update(rootPath, searchFolder, peerDependency, peerVersion) {
	await processPackages(searchFolder, peerDependency, peerVersion)
	fixFormat(rootPath)
}

const rootPath = path.join(path.dirname(__filename), '..')
const searchFolder = path.join(rootPath, 'plugins')
const peerDependency = 'vizzu'
const peerVersion = process.argv[2]
if (!peerVersion) {
	console.error('Please provide the new vizzu version as an argument.')
	process.exit(1)
}

update(rootPath, searchFolder, peerDependency, peerVersion)
