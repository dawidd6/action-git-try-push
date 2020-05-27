const core = require('@actions/core')
const exec = require('@actions/exec')

async function main() {
    try {
        const token = core.getInput("token")
        const tries = core.getInput("tries") || 10
        const directory = core.getInput("directory")

        if (directory) {
            process.chdir(directory)
        }

        if (token) {
            await exec.exec("git", ["config", "--local", "http.https://github.com/.extraheader", `AUTHORIZATION: basic ${token}`])
        }

        for (let i = 0; i < tries; i++) {
            try {
                await exec.exec("git", ["push"])
                return
            } catch (error) {
                await exec.exec("git", ["pull", "--rebase"])
            }
        }

        throw "Max tries reached"
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
