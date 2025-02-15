import fs from 'fs-extra'
import path from 'path'
import request from 'request'

const GITHUB_API = 'https://api.github.com/'
const GITHUB = 'https://github.com.cnpmjs.org/'

export function getGithubRepoLatestReleaseVersion (repoName: string) {
  const latestReleaseApi = `${GITHUB_API}repos/${repoName}/releases/latest`
  const p = new Promise((resolve) => {
    request({
      url: latestReleaseApi,
      headers: {
        'User-Agent': 'Awesome-Octocat-App'
      }
    }, (err, response, body) => {
      if (err) {
        throw new Error('快应用容器版本请求失败，请重试！' + err)
      }
      const res = JSON.parse(body)
      resolve(res.tag_name)
    })
  })
  return p
}

export async function downloadGithubRepoLatestRelease (repoName: string, appPath: string, dest: string) {
  const latestTagName = await getGithubRepoLatestReleaseVersion(repoName)
  return new Promise<void>((resolve, reject) => {
    const downloadUrl = `${GITHUB}${repoName}/archive/${latestTagName}.zip`
    const downloadTemp = 'download_temp.zip'
    request({
      url: downloadUrl,
      headers: {
        'User-Agent': 'Awesome-Octocat-App'
      }
    })
      .on('error', reject)
      .on('complete', () => {
        const downloadTempPath = path.join(appPath, downloadTemp)
        if (fs.existsSync(downloadTempPath)) {
          fs.moveSync(downloadTempPath, path.join(dest, downloadTemp))
          resolve()
        }
      })
      .pipe(fs.createWriteStream(downloadTemp))
  })
}
