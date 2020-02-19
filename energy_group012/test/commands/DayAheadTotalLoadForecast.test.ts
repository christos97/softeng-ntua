import {expect, test} from '@oclif/test'

describe('DayAheadTotalLoadForecast', () => {
  test
  .stdout()
  .command(['DayAheadTotalLoadForecast'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['DayAheadTotalLoadForecast', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
