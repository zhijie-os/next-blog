import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

function computeReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        ...matterResult.data,
        content: matterResult.content,
      }
    })
    .filter((post: any) => !post.draft)

  return allPostsData
    .map((post: any) => {
      const { content, ...rest } = post
      return {
        ...rest,
        readingTime: computeReadingTime(content),
      }
    })
    .sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      // Skip draft posts
      if (matterResult.data.draft) return null
      return {
        params: { id }
      }
    })
    .filter(Boolean)
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const content = matterResult.content

  return {
    id,
    content,
    readingTime: computeReadingTime(content),
    ...matterResult.data,
  }
}
