import fs from 'fs'

function deleteFolderRecursive(path) {
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
		fs.readdirSync(path).forEach(function (file, index) {
			var curPath = path + '/' + file

			if (fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderRecursive(curPath)
			} else {
				// delete file
				fs.unlinkSync(curPath)
			}
		})

		fs.rmdirSync(path)
	}
}
deleteFolderRecursive('./dist')

fs.mkdirSync('./dist')
