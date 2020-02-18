import {expect, test} from '@oclif/test'

describe('ActualTotalLoad', () => {
  test
  .stdout()
  .command(['ActualTotalLoad'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['ActualTotalLoad', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
