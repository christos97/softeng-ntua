import {expect, test} from '@oclif/test'

describe('ActualvsForecast', () => {
  test
  .stdout()
  .command(['ActualvsForecast'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['ActualvsForecast', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
