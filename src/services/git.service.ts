import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

function cleanStdout (stdout: string): string[] {
  return stdout.trim().split('\n').filter(Boolean)
}

export async function getGitBranch (): Promise<string> {
  const { stdout } = await execAsync('git branch')
  return cleanStdout(stdout)?.at(0)?.split(' ')?.at(1) ?? ''
}

export async function getGitCommit (): Promise<string> {
  const { stdout } = await execAsync('git log --oneline')
  return cleanStdout(stdout)?.at(0)?.split(' ').slice(1).join(' ') ?? ''
}
