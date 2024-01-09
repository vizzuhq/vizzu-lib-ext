const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

async function updatePackageJson(packageJsonPath, peerDependency, peerVersion) {
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

		console.log(`Updated ${packageJsonPath} to version ${newVersion}`)

		return newVersion
	} catch (error) {
		console.error(`Error updating ${packageJsonPath}: ${error.message}`)
	}
}

async function processPackages(searchFolder, peerDependency, peerVersion) {
	const packageJsonFiles = glob.sync('**/package.json', { cwd: searchFolder, absolute: true })

	for (const packageJsonPath of packageJsonFiles) {
		const newVersion = await updatePackageJson(packageJsonPath, peerDependency, peerVersion)
		await updateChangelog(
			path.join(path.dirname(packageJsonPath), 'CHANGELOG.md'),
			newVersion,
			peerVersion
		)
	}
}

async function updateChangelog(changelogPath, newVersion, peerVersion) {
	try {
		const [peerMajor, peerMinor] = peerVersion.split('.').map(Number)
		const changelogContent = fs.readFileSync(changelogPath, 'utf-8')
		const unreleasedIndex = changelogContent.indexOf('## [Unreleased]')
		if (unreleasedIndex !== -1) {
			const newChangelogContent =
				changelogContent.slice(0, unreleasedIndex + 16) +
				`\n\n## [${newVersion}]\n\n-   Set vizzu-${peerMajor}.${peerMinor}.x as a peer dependency` +
				changelogContent.slice(unreleasedIndex + 16)

			fs.writeFileSync(changelogPath, newChangelogContent)
			console.log(`Updated ${changelogPath} with new release ${newVersion}`)
		} else {
			console.error(`Error: Could not find "[Unreleased]" section in ${changelogPath}`)
		}
	} catch (error) {
		console.error(`Error updating ${changelogPath}: ${error.message}`)
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
