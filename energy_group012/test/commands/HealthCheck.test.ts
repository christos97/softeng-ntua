import {expect, test} from '@oclif/test'

describe('HealthCheck', () => {
  test
  .stdout()
  .command(['HealthCheck'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['HealthCheck', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
